import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamPeriodOpeningComponent } from './admin/exam-period-opening/exam-period-opening.component';
import { ProfessorAddComponent } from './admin/professor-add/professor-add.component';
import { ProfessorsComponent } from './admin/professors/professors.component';
import { StudentAddComponent } from './admin/student-add/student-add.component';
import { StudentsComponent } from './admin/students/students.component';
import { SubjectAddComponent } from './admin/subject-add/subject-add.component';
import { SubjectsComponent } from './admin/subjects/subjects.component';
import { WayAddComponent } from './admin/way-add/way-add.component';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';
import { ExamFillingsComponent } from './professor/exam-fillings/exam-fillings.component';
import { ProfessorInfoComponent } from './professor/info/info.component';
import { ProfessorStudentsComponent } from './professor/students/students.component';
import { ProfessorSubjectsComponent } from './professor/subjects/subjects.component';
import { AdminAuthService } from './services/admin/admin-auth.service';
import { NoAuthService } from './services/common/no-auth.service';
import { ProfessorAuthService } from './services/professor/professor-auth.service';
import { StudentAuthService } from './services/student/student-auth.service';
import { ExamRegistrationComponent } from './student/exam-registration/exam-registration.component';
import { StudentInfoComponent } from './student/info/info.component';
import { NotPassedExamsComponent } from './student/not-passed-exams/not-passed-exams.component';
import { RegisteredExamsComponent } from './student/registered-exams/registered-exams.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [NoAuthService] },
  {
    path: 'register', component: RegisterComponent,
    canActivate: [NoAuthService]
  },
  {
    path: 'admin/students', component: StudentsComponent,
    canActivate: [AdminAuthService]
  },
  { 
    path: 'admin/addStudent', component: StudentAddComponent,
    canActivate: [AdminAuthService]
  },
  { 
    path: 'admin/professors', component: ProfessorsComponent,
    canActivate: [AdminAuthService]
  },
  { 
    path: 'admin/addProfessor', component: ProfessorAddComponent,
    canActivate: [AdminAuthService]
  },
  { 
    path: 'admin/addWay', component: WayAddComponent,
    canActivate: [AdminAuthService]
  },
  { 
    path: 'admin/subjects', component: SubjectsComponent,
    canActivate: [AdminAuthService]
  },
  { 
    path: 'admin/openExamPeriod', component: ExamPeriodOpeningComponent,
    canActivate: [AdminAuthService]
  },
  { 
    path: 'admin/addSubject', component: SubjectAddComponent,
    canActivate: [AdminAuthService]
  },
  { 
    path: 'student/info', component: StudentInfoComponent,
    canActivate: [StudentAuthService]
  },
  { 
    path: 'student/registerExam', component: ExamRegistrationComponent,
    canActivate: [StudentAuthService]
  },
  { 
    path: 'student/examRegistrations', component: RegisteredExamsComponent,
    canActivate: [StudentAuthService]
  },
  { 
    path: 'student/notPassedExams', component: NotPassedExamsComponent,
    canActivate: [StudentAuthService]
  },
  {
    path: 'professor/info', component: ProfessorInfoComponent,
    canActivate: [ProfessorAuthService]
  },
  {
    path: 'professor/mySubjects', component: ProfessorSubjectsComponent,
    canActivate: [ProfessorAuthService]
  },
  {
    path: 'professor/subject/:id', component: ProfessorStudentsComponent,
    canActivate: [ProfessorAuthService]
  },
  {
    path: 'professor/fillSubject/:id', component: ExamFillingsComponent,
    canActivate: [ProfessorAuthService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
