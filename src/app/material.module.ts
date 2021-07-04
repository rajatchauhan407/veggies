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
import { LyImageCropperModule } from "@alyle/ui/image-cropper";
import { LySliderModule } from '@alyle/ui/slider';
import { LyButtonModule } from '@alyle/ui/button';
import { LyIconModule } from '@alyle/ui/icon';
import { LyDialogModule } from '@alyle/ui/dialog';
import {
        HAMMER_GESTURE_CONFIG,
        HammerModule
      } from '@angular/platform-browser';
      
      /** Import Alyle UI */
      import {
        LyTheme2,
        StyleRenderer,
        LY_THEME,
        LY_THEME_NAME,
        LyHammerGestureConfig
      } from '@alyle/ui';
      import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';
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
            MatDividerModule,
            LyImageCropperModule,
    LySliderModule,
    LyButtonModule,
    LyIconModule,
    LyDialogModule
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
            MatDividerModule,
            LyImageCropperModule,
    LySliderModule,
    LyButtonModule,
    LyIconModule,
    LyDialogModule
            ],
            providers: [
                [ LyTheme2 ],
                [ StyleRenderer ],
                // Theme that will be applied to this module
                { provide: LY_THEME_NAME, useValue: 'minima-light' },
                { provide: LY_THEME, useClass: MinimaLight, multi: true }, // name: `minima-light`
                { provide: LY_THEME, useClass: MinimaDark, multi: true }, // name: `minima-dark`
                // Gestures
                { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig }
              ]

})
export class MaterialModule{

}