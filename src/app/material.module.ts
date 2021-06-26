import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
@NgModule({
    imports:[MatButtonModule,
             MatIconModule,
            MatFormFieldModule,
            MatInputModule,
            MatCheckboxModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatSidenavModule,
            MatToolbarModule,
            MatListModule,
            MatTabsModule,
            MatCardModule,
            MatDialogModule,
            MatSelectModule,
            MatPaginatorModule,
            MatTableModule,
            MatDividerModule
            ],
    exports:[MatButtonModule,
            MatIconModule,
            MatFormFieldModule,
            MatInputModule,
            MatCheckboxModule,
            MatDatepickerModule,
            MatSidenavModule,
            MatToolbarModule,
            MatListModule,
            MatTabsModule,
            MatCardModule,
            MatDialogModule,
            MatSelectModule,
            MatPaginatorModule,
            MatTableModule,
            MatDividerModule
            ]
})
export class MaterialModule{

}