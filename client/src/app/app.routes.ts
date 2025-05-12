import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { HomeComponent } from '../components/home/home.component';
import { ChatComponent } from '../components/chat/chat.component';
export const routes: Routes = [

    {
        path : '',
        component : LoginComponent
    },{
        path : 'signup',
        component : SignupComponent
    },{
        path : 'home',
        component : HomeComponent
    },{
        path : 'chat',
        component : ChatComponent
    }
    
];
