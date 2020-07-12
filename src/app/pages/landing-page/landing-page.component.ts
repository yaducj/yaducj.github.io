import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TimelineMax, TimelineLite } from 'gsap';
import { ContentService } from 'src/app/services/content.service';
import { Category } from 'src/app/models/category.model';
import { ViewportRuler } from '@angular/cdk/overlay';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  overlayTl: TimelineMax;
  bannerTl: TimelineMax;
  to: any;
  categories: Category[];
  vh: number;

  constructor(
    private contentService: ContentService,
    private viewPortRuler: ViewportRuler
  ) {}

  ngAfterViewInit(): void {
    this.bannerTl.play();
    this.to = setTimeout(() => {
      this.overlayTl.play();
    }, 2000);
  }

  ngOnInit(): void {
    this.contentService
      .getCategories()
      .subscribe((data) => (this.categories = data));
    this.vh = this.viewPortRuler.getViewportSize().height;
  }

  overlayAnimationComplete(overlayTl: TimelineMax) {
    this.overlayTl = overlayTl;
  }

  bannerAnimationComplete(bannerTl: TimelineMax) {
    this.bannerTl = bannerTl;
  }
}
