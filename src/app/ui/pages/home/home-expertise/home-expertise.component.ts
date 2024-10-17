import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ReplaySubject, takeUntil, startWith, map, scan, distinctUntilChanged, takeWhile, switchMap, Observable } from 'rxjs';
import { TRANSITION_IMAGE_SCALE, TRANSITION_TEXT } from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-home-expertise',
  templateUrl: './home-expertise.component.html',
  styleUrls: ['./home-expertise.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ]
})
export class HomeExpertiseComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false

  /* ********************************************************************************************
    *                anims
    */
  _mTriggerAnim?= 'false'

  _mTriggerImage?= 'false'


  _mThreshold = 0.2


  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher, private viewPortRuler: ViewportRuler) { }

  ngOnInit(): void {
  }



  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {

    this.destroyed$.next(true)
    this.destroyed$.complete()
  }


  public setupAnimation() {
    if (!this.vAnimRefView) return;

    // console.info("home products setupAnimation: " )
    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      // Makes sure to dispose on destroy
      takeUntil(this.destroyed$),
      startWith(0),
      map(() => {
        if (this.vAnimRefView != null) {
          var visibility = UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler)
          // console.log("product app-item UiUtilsView visibility: ", visibility)
          return visibility;
        }
        return 0;

      }),
      scan<number, boolean>((acc: number | boolean, val: number) => (val >= this._mThreshold || (acc ? val > 0 : false))),
      // Distincts the resulting triggers 
      distinctUntilChanged(),
      // Stop taking the first on trigger when aosOnce is set
      takeWhile(trigger => {
        // console.info("app-item  !trigger || !this.mOnceAnimated",
        //   !trigger || !this.mOnceAnimated)

        return !trigger || !this.mOnceAnimated
      }, true),
      switchMap(trigger => new Observable<number | boolean>(observer => this._ngZone.run(() => observer.next(trigger))))
    ).subscribe(val => {


      // console.log("home-item setupAnimation ancestorScrolled: ", val)

      if (this.mOnceAnimated) {
        return;
      }

      if (val) {
        // console.log("HomeProductsComponent setupAnimation setupAnimation ancestorScrolled: ", val)

        this.mOnceAnimated = true
        this._mTriggerAnim = 'true'
        this.cdr.detectChanges()
      }
      // if (this.vImageArea != null) {
      //   var visibility = UiUtilsView.getVisibility(this.vImageArea, this.viewPortRuler)
      //   console.log("UiUtilsView visibility: ", visibility)
      // }
    }

    )
  }

  _mTools = [

     // "data science"

     {
      "id": "6121",
      "name": "Python",
      "logo": "assets/img/tools/icons8-python-96.png",
      "link": "https://www.python.org/",
      "tab": "data science"
    },

    {
      "id": "6123",
      "name": "Machine Learning",
      "logo": "assets/img/tools/icons8-machine-learning-80.png",
      "link": "https://en.wikipedia.org/wiki/Machine_learning",
      "tab": "data science"
    },
    {
      "id": "8109",
      "name": "Statistics",
      "logo": "assets/img/tools/icons8-statistics-80.png",
      "link": "https://en.wikipedia.org/wiki/Statistics",
      "tab": "web",
    },
    {
      "id": "6124",
      "name": "Google cloud",
      "logo": "assets/img/tools/google-cloud.png",
      "link": "https://cloud.google.com/",
      "tab": "data science"
    },


    {
      "id": "6128",
      "name": "Tabelu",
      "logo": "assets/img/tools/icons8-tableau-software-96.png",
      "link": "https://www.tableau.com/",
      "tab": "data science"
    },

    {
      "id": "6125",
      "name": "EDA",
      "logo": "assets/img/tools/icons8-exploratory-data-analysis-64.png",
      "link": "https://www.ibm.com/topics/exploratory-data-analysis",
      "tab": "data science"
    },

    {
      "id": "6126",
      "name": "R-Programming",
      "logo": "assets/img/tools/icons8-r-100.png",
      "link": "https://www.r-project.org/about.html",
      "tab": "data science"
    },
    // icons8-r-100.png
    // android
    {
      "id": "9110",
      "name": "Android",
      "logo": "assets/img/tools/android.svg",
      "link": "https://developer.android.com/",
      "tab": "android",
      "color": "#3DDC84"
    },
    {
      "id": "9112",
      "name": "SQL",
      "logo": "assets/img/tools/icons8-sql-80.png",
      "link": "https://aws.amazon.com/what-is/sql/#:~:text=Structured%20query%20language%20(SQL)%20is,relationships%20between%20the%20data%20values.",
      "tab": "android"
    },
    {
      "id": "9113",
      "name": "RxJS",
      "logo": "assets/img/tools/RxJava-logo.png",
      "link": "http://reactivex.io/",
      "tab": "android"
    },
    {
      "id": "9114",
      "name": "Matplotlib",
      "logo": "assets/img/tools/Matplotlib_icon.svg",
      "link": "https://matplotlib.org/",
      "tab": "data science"
    },
    {
      "id": "9115",
      "name": "Seaborn",
      "logo": "assets/img/tools/seaborn-seeklogo.svg",
      "link": "https://seaborn.pydata.org/index.html",
      "tab": "android"
    },
    {
      "id": "9116",
      "name": "Kotlin",
      "logo": "assets/img/tools/kotlin-logo.png",
      "link": "https://kotlinlang.org/",
      "tab": "android"
    },

    // cross
{
      "id": "4101",
      "name": "No SQL",
      "logo": "assets/img/tools/icons8-no-sql-64.png",
      "link": "https://www.ibm.com/topics/nosql-databases#:~:text=NoSQL%2C%20also%20referred%20to%20as,structures%20found%20in%20relational%20databases.",
      "tab": "Cross",
      "color": "#42A5F5"
    },

    // web

    

    {
      "id": "8102",
      "name": "HTML",
      "logo": "assets/img/tools/icons8-html-96.png",
      "link": "https://www.w3schools.com/html/",
      "tab": "web"
    },

    {
      "id": "8103",
      "name": "WebComponents",
      "logo": "assets/img/tools/web-component-logo.png",
      "link": "https://www.webcomponents.org/",
      "tab": "web"
    },
    {
      "id": "8105",
      "name": "Bootstrap",
      "logo": "assets/img/tools/icons8-bootstrap-96.png",
      "link": "https://getbootstrap.com/",
      "tab": "web"
    },
    {
      "id": "8108",
      "name": "Sass",
      "logo": "assets/img/tools/sass-logo.svg",
      "link": "https://sass-lang.com/",
      "tab": "web",
      "color": "#CF649A"
    },
    {
      "id": "8106",
      "name": "D3 js",
      "logo": "assets/img/tools/d3.svg",
      "link": "https://d3js.org/",
      "tab": "web"
    },
    {
      "id": "8104",
      "name": "Ngrx",
      "logo": "assets/img/tools/ngrx.svg",
      "link": "https://ngrx.io/",
      "tab": "web"
    },
    {
      "id": "8101",
      "name": "Angular",
      "logo": "assets/img/tools/angular.png",
      "link": "https://angular.io/",
      "tab": "web",
      "color": "#FF4369"
    },
   

    // backend

    {
      "id": "7121",
      "name": "Scrum",
      "logo": "assets/img/tools/icons8-scrum-64.png",
      "link": "https://www.scrum.org/resources/what-scrum-module",
      "tab": "back-end"
    },
    {
      "id": "7122",
      "name": "Trello",
      "logo": "assets/img/tools/icons8-trello-96.png",
      "link": "https://trello.com/?aceid&adposition&adgroup=143241824842&campaign=18406634139&creative=633330905204&device=c&keyword=trello&matchtype=e&network=g&placement&ds_kids=p73316792581&ds_e=GOOGLE&ds_eid=700000001557344&ds_e1=GOOGLE&gad_source=1",
      "tab": "back-end"
    },

    {
      "id": "7126",
      "name": "NodeJs",
      "logo": "assets/img/tools/nodejs.png",
      "link": "https://nodejs.org/en/",
      "tab": "back-end"
    },

  
 // design
 {
  "id": "5131",
  "name": "Figma",
  "logo": "assets/img/tools/figma.svg",
  "link": "https://www.figma.com/",
  "tab": "design"
},
{
  "id": "5132",
  "name": "Adobe XD",
  "logo": "assets/img/tools/xd.png",
  "link": "https://www.adobe.com/products/xd.html",
  "tab": "design"
},

{
  "id": "5133",
  "name": "Adobe Photoshop",
  "logo": "assets/img/tools/ps.png",
  "link": "https://www.adobe.com/products/photoshop.html",
  "tab": "design"
},

  ]

}
