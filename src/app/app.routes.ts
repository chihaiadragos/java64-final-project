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
import { AddCarComponent } from './add-car/add-car.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { BookReservationComponent } from './book-reservation/book-reservation.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BranchCardComponent } from './branch-card/branch-card.component';
import { BranchesComponent } from './branches/branches.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';

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
        path: 'navbar',
        component: NavbarComponent
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
        path: 'customer-dashboard',
        component: CustomerDashboardComponent
    },
    {
        path: 'reservation',
        component: ReservationsComponent
    },
    {
        path: 'branch',
        component: BranchCardComponent
    },
    {
        path: 'branches',
        component: BranchesComponent
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
    },
    {
        path: 'add-car',
        component: AddCarComponent
    },
    {
        path: 'add-branch',
        component: AddBranchComponent
    },
    {
        path: 'book-reservation',
        component: BookReservationComponent
    }, 
    {
        path: 'car/:id',
        component: CarDetailsComponent
    }
];
