import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatBadgeModule }  from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';


@NgModule({
    imports: [MatButtonModule, MatCheckboxModule,
              MatToolbarModule, MatCardModule,
              MatListModule, MatFormFieldModule,
              MatInputModule, MatDialogModule,
              MatGridListModule, MatDividerModule,
              MatIconModule, MatTooltipModule,
              MatTableModule, MatRadioModule,
              MatSelectModule, MatPaginatorModule,
              MatMenuModule, MatStepperModule,
              MatBadgeModule, MatSlideToggleModule,
              MatSortModule, MatDatepickerModule,
              MatNativeDateModule, MatBottomSheetModule ],   
    exports: [MatButtonModule, MatCheckboxModule, 
              MatToolbarModule, MatCardModule,
              MatListModule, MatFormFieldModule,
              MatInputModule, MatDialogModule,
              MatGridListModule, MatDividerModule,
              MatIconModule, MatTooltipModule,
              MatTableModule, MatRadioModule,
              MatSelectModule, MatPaginatorModule,
              MatMenuModule, MatStepperModule,
              MatBadgeModule, MatSlideToggleModule,
              MatSortModule, MatDatepickerModule,
              MatNativeDateModule, MatBottomSheetModule ]
})

export class MaterialModule{}