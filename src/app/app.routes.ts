import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { FleetComponent } from './routes/fleet/fleet.component';
import { CarCardComponent } from './car-card/car-card.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './routes/about/about.component';
import { ContactComponent } from './routes/contact/contact.component';
import { CarDetailsComponent } from './routes/car-details/car-details.component';
import { CarUpdateComponent } from './routes/car-update/car-update.component';
import { DashboardEmployeeComponent } from './dashboard-employee/dashboard-employee.component';
import { TestComponent } from './test/test.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'fleet',
        component: FleetComponent
    },
    {
        path: 'car',
        component: CarCardComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'car/:id',
        component: CarDetailsComponent
    },
    {
        path: 'update/:id',
        component: CarUpdateComponent
    },
    {
        path: 'dashboard/:id',
        component: DashboardEmployeeComponent
    },
    {
        path: 'test',
        component: TestComponent
    },
    {
        path: 'reservation',
        component: ReservationsComponent
    },
    {
        path: 'add-reservation',
        component: AddReservationComponent
    },
    {
        path: 'add-employee',
        component: AddEmployeeComponent
    },
    {
        path: 'file-upload',
        component: FileUploadComponent
    }
];
