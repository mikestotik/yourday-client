import {
  AfterViewInit,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Inject,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Directive({
  selector: '[contenteditable][formControl]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContenteditableDirective),
      multi: true
    }
  ]
})
export class ContenteditableDirective implements ControlValueAccessor, AfterViewInit, OnDestroy {

  private onTouched = () => {};

  private onChange = (_value: string) => {};

  private observer!: MutationObserver;


  constructor(
    @Inject(ElementRef)
    private readonly elementRef: ElementRef<Element>,
    @Inject(Renderer2)
    private readonly renderer: Renderer2) {

    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'contenteditable',
      'true'
    );
  }


  public ngAfterViewInit() {
    this.observer = new MutationObserver(() => {
      this.onChange(this.elementRef.nativeElement.innerHTML);
    });

    this.observer.observe(this.elementRef.nativeElement, {
      characterData: true,
      childList: true,
      subtree: true
    });
  }


  public ngOnDestroy() {
    this.observer.disconnect();
  }


  @HostListener('input')
  public onInput() {
    this.observer.disconnect();
    this.onChange(this.elementRef.nativeElement.innerHTML);
  }


  @HostListener('blur')
  public onBlur() {
    this.onTouched();
  }


  public writeValue(value: string) {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      value || ''
    );
  }


  public registerOnChange(onChange: (value: string) => void) {
    this.onChange = onChange;
  }


  public registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }


  public setDisabledState(disabled: boolean): void {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'contenteditable',
      String(!disabled)
    );
  }
}
