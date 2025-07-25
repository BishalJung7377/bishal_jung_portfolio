import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormBuilder } from '@angular/forms';
import { ReplaySubject, takeUntil, startWith, map, scan, distinctUntilChanged, takeWhile, switchMap, Observable } from 'rxjs';
import { AppType } from 'src/app/types/apps_type';
import { TRANSITION_IMAGE_SCALE, TRANSITION_TEXT } from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-my-apps',
  templateUrl: './my-apps.component.html',
  styleUrls: ['./my-apps.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ]
})
export class MyAppsComponent implements OnInit {


  _mApps : AppType[] = [
  
    {
      "id": "5133",
      "name": "Early Heart Disease Classification",
      "image": "../../../../../../assets/img/avatar/dataset-card.jpg",
      "link": "https://github.com/BishalJung7377/heart_disease_classification",
      "tab": "ML",
      "caption": "Predicting Heart Disease Risk Using Machine Learning",
      "isFull": false,
      "primary":"#E1E1E1",
      "background":"#2c698d"
    },
    {
     "id": "5131",
     "name": "Sentiment Analysis",
     "image": "../../../../../../assets/img/avatar/sentiment analysis.png",
     "link": "https://github.com/BishalJung7377/sentiment_analysis_natural_disaster_tweets",
     "tab": "Sentiment",
     "caption": "ML and NLP for Sentiments Analysis",
     "isFull": false,
     "primary":"#61dafb",
     "background":"#E1E1E1"
   },
   {
     "id": "5132",
     "name": "Vetmentsfashion Nepal",
     "image": "../../../../../../assets/img/avatar/mobile.png",
     "link": "https://github.com/BishalJung7377/VetementsFashionNepal",
     "tab": "Android",
     "isFull": false,
     "caption": "In Android(Kotlin) -",
     "primary" : "#3CE79F",
     "background":"#E1E1E1"
   },
   {
     "id": "5133",
     "name": "Shoe Price Predictior",
     "image": "../../../../../../assets/img/avatar/shoepriceprediction.webp",
     "link": "https://www.kaggle.com/code/bishaljungthapa/shoe-price-eda",
     "tab": "Android",
     "caption": "Python (EDA) -",
     "isFull": false,
     "background":"#3CE79F"
   }
  //  {
  //   "id": "5133",
  //   "name": "Shoe Price Predictior",
  //   "image": "../../../../../../assets/img/avatar/bishal_avatar.jpg",
  //   "link": "https://www.kaggle.com/code/bishaljungthapa/shoe-price-eda",
  //   "tab": "Android",
  //   "caption": "Python (EDA) -",
  //   "isFull": true,
  //   "background":"#3CE79F"
  // }
  ];

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false

  /* ********************************************************************************************
    *                anims
    */
  _mTriggerAnim?= 'false'



  _mThreshold = 0.4


  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher, private viewPortRuler: ViewportRuler,
    private formBuilder: FormBuilder) {



  }

  ngOnInit(): void {
  }



  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {

    this.destroyed$.next(true)
    this.destroyed$.complete()
  }




  /* ***************************************************************************
   *                                  other parts
   */


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
}
