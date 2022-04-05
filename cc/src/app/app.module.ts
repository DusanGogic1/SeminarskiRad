import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';
import { ProfessorsComponent } from './admin/professors/professors.component';
import { StudentsComponent } from './admin/students/students.component';
import { SubjectsComponent } from './admin/subjects/subjects.component';
import { ProfessorAddComponent } from './admin/professor-add/professor-add.component';
import { StudentAddComponent } from './admin/student-add/student-add.component';
import { SubjectAddComponent } from './admin/subject-add/subject-add.component';
import { WayAddComponent } from './admin/way-add/way-add.component';
import { ExamPeriodOpeningComponent } from './admin/exam-period-opening/exam-period-opening.component';
import { StudentInfoComponent } from './student/info/info.component';
import { RegisteredExamsComponent } from './student/registered-exams/registered-exams.component';
import { NotPassedExamsComponent } from './student/not-passed-exams/not-passed-exams.component';
import { ExamRegistrationComponent } from './student/exam-registration/exam-registration.component';
import { ExamFillingsComponent} from './professor/exam-fillings/exam-fillings.component';
import { AdminSidebarComponent } from './admin/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentSidebarComponent } from './student/sidebar/sidebar.component';
import { ProfessorSidebarComponent } from './professor/sidebar/sidebar.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { ProfessorInfoComponent } from './professor/info/info.component';
import { ProfessorSubjectsComponent } from './professor/subjects/subjects.component';
import { ProfessorStudentsComponent } from './professor/students/students.component';

@NgModule({
  declarations: [
    AppComponent,
    //common
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    //admin
    AdminSidebarComponent,
    ProfessorsComponent,
    StudentsComponent,
    SubjectsComponent,
    ProfessorAddComponent,
    StudentAddComponent,
    SubjectAddComponent,
    WayAddComponent,
    ExamPeriodOpeningComponent,
    //student
    StudentSidebarComponent,
    StudentInfoComponent,
    RegisteredExamsComponent,
    NotPassedExamsComponent,
    ExamRegistrationComponent,
    //professor
    ExamFillingsComponent,
    ProfessorSidebarComponent,
    ProfessorInfoComponent,
    ProfessorSubjectsComponent,
    ProfessorStudentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
