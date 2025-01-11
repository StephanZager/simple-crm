import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCalendar, MatDatepickerControl, MatDatepickerModule, MatDatepickerPanel } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog'
import { User } from '../../models/user.class';
import { NgModel } from '@angular/forms';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { UserComponent } from '../user/user.component';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [FormsModule, MatButtonModule,
    MatDialogActions,
    MatDatepickerModule,
    MatDialogClose,
    MatDialogContent,
    MatInputModule,
    MatDialogTitle,
    MatFormFieldModule,
    MatCalendar,
    MatDatepickerModule,
    MatProgressBarModule, NgIf
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate: Date | undefined;
  firestore: Firestore = inject(Firestore);
  loading = false
  @Output() userAdded = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  async saveUser(): Promise<void> {
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
    }
    console.log('User saved:', this.user);
    this.loading = true;

    try {
      const userCollection = collection(this.firestore, 'users');
      await addDoc(userCollection, { ...this.user });
      console.log('User added to Firestore');
      this.userAdded.emit();
      this.dialogRef.close();
      const userComponent = inject(UserComponent);
      await userComponent.loadUsers();
    } catch (error) {
      console.error('Error adding user to Firestore: ', error);
    }
  }
}
