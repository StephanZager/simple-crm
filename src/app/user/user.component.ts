import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { NgForOf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule,NgForOf,MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  user = new User();
  firestore: Firestore = inject(Firestore);
  allUser: User[] = [];


  constructor(private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.loadUsers();
    console.log(this.user)
  }
  async loadUsers(): Promise<void> {
    const userCollection = collection(this.firestore, 'users').withConverter<User>({
      toFirestore: (user: User) => ({ ...user }),
      fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options)!;
        const user = new User(data);
        user.id = snapshot.id;
        return user;
      }
    });
    const userSnapshot = await getDocs(userCollection);
    this.allUser = userSnapshot.docs.map(doc => doc.data() as User);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent);

    dialogRef.componentInstance.userAdded.subscribe(() => {
      this.loadUsers(); // Benutzerliste nach dem Hinzufügen eines neuen Benutzers aktualisieren
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers(); 
      }
    });
  }
  

}
