import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnswerCardComponent } from './answer-card/answer-card.component';
import { QuestionCardComponent } from './question-card/question-card.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AnswerSelectionComponent } from './answer-selection/answer-selection.component';
import { QuestionSelectionComponent } from './question-selection/question-selection.component';
import { BestAnswerSelectionComponent } from './best-answer-selection/best-answer-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    AnswerCardComponent,
    QuestionCardComponent,
    AnswerSelectionComponent,
    QuestionSelectionComponent,
    BestAnswerSelectionComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
