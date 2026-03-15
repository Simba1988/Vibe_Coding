import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { PaginationComponent } from './pagination';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let componentRef: ComponentRef<PaginationComponent>;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('currentPage', 2);
    componentRef.setInput('totalPages', 5);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display current page and total pages', () => {
    const info = fixture.nativeElement.querySelector('.pagination-info') as HTMLElement;
    expect(info.textContent).toContain('Page 2 of 5');
  });

  it('should emit previous page on previous click', () => {
    let emittedPage: number | undefined;
    component.pageChange.subscribe((p: number) => (emittedPage = p));

    const buttons = fixture.nativeElement.querySelectorAll(
      'button',
    ) as NodeListOf<HTMLButtonElement>;
    buttons[0].click();

    expect(emittedPage).toBe(1);
  });

  it('should emit next page on next click', () => {
    let emittedPage: number | undefined;
    component.pageChange.subscribe((p: number) => (emittedPage = p));

    const buttons = fixture.nativeElement.querySelectorAll(
      'button',
    ) as NodeListOf<HTMLButtonElement>;
    buttons[1].click();

    expect(emittedPage).toBe(3);
  });

  it('should disable previous button on first page', () => {
    componentRef.setInput('currentPage', 1);
    fixture.detectChanges();

    const prevBtn = fixture.nativeElement.querySelectorAll('button')[0] as HTMLButtonElement;
    expect(prevBtn.disabled).toBe(true);
  });

  it('should disable next button on last page', () => {
    componentRef.setInput('currentPage', 5);
    fixture.detectChanges();

    const nextBtn = fixture.nativeElement.querySelectorAll('button')[1] as HTMLButtonElement;
    expect(nextBtn.disabled).toBe(true);
  });
});
