import {TextInput} from 'ionic/ionic';

export function run() {

  it('should scroll, top and bottom below safe area, no room to scroll', () => {

    let inputOffsetTop = 350;
    let inputOffsetHeight = 35;
    let scrollViewDimensions = {
      contentTop: 100,
      contentHeight: 700,
      scrollTop: 30,
      scrollHeight: 700
    };
    let keyboardHeight = 400;

    let scrollData = TextInput.getScollData(inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight);

    expect(scrollData.scrollAmount).toBe(-178.5);
    expect(scrollData.scrollTo).toBe(208.5);
    expect(scrollData.scrollPadding).toBe(523.5);
  });

  it('should scroll, top and bottom below safe area, room to scroll', () => {

    let inputOffsetTop = 350;
    let inputOffsetHeight = 35;
    let scrollViewDimensions = {
      contentTop: 100,
      contentHeight: 700,
      scrollTop: 30,
      scrollHeight: 1000
    };
    let keyboardHeight = 400;

    let scrollData = TextInput.getScollData(inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight);

    expect(scrollData.scrollAmount).toBe(-178.5);
    expect(scrollData.scrollTo).toBe(208.5);
    expect(scrollData.scrollPadding).toBe(0);
  });

  it('should scroll, top above safe', () => {
    // Input top within safe area, bottom below safe area, room to scroll
    let inputOffsetTop = 100;
    let inputOffsetHeight = 33;
    let scrollViewDimensions = {
      contentTop: 100,
      contentHeight: 700,
      scrollTop: 250,
      scrollHeight: 700
    };
    let keyboardHeight = 400;

    let scrollData = TextInput.getScollData(inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight);

    expect(scrollData.scrollAmount).toBe(150);
    expect(scrollData.scrollTo).toBe(100);
    expect(scrollData.scrollPadding).toBe(0);
  });

  it('should scroll, top in safe, bottom below safe, below more than top in, not enough padding', () => {
    // Input top within safe area, bottom below safe area, room to scroll
    let inputOffsetTop = 100;
    let inputOffsetHeight = 320;
    let scrollViewDimensions = {
      contentTop: 100,
      contentHeight: 700,
      scrollTop: 20,
      scrollHeight: 700
    };
    let keyboardHeight = 400;

    let scrollData = TextInput.getScollData(inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight);

    expect(scrollData.scrollAmount).toBe(-80);
    expect(scrollData.scrollTo).toBe(100);
    expect(scrollData.scrollPadding).toBe(523.5);
  });

  it('should scroll, top in safe, bottom below safe, below more than top in, enough padding', () => {
    // Input top within safe area, bottom below safe area, room to scroll
    let inputOffsetTop = 20;
    let inputOffsetHeight = 330;
    let scrollViewDimensions = {
      contentTop: 100,
      scrollTop: 0,
    };
    let keyboardHeight = 400;

    let scrollData = TextInput.getScollData(inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight);

    expect(scrollData.scrollAmount).toBe(-20);
    expect(scrollData.scrollTo).toBe(20);
    expect(scrollData.scrollPadding).toBe(0);
  });

  it('should scroll, top in safe, bottom below safe, below less than top in, enough padding', () => {
    // Input top within safe area, bottom below safe area, room to scroll
    let inputOffsetTop = 250;
    let inputOffsetHeight = 80; // goes 30px below safe area
    let scrollViewDimensions = {
      contentTop: 100,
      scrollTop: 0,
    };
    let keyboardHeight = 400;

    let scrollData = TextInput.getScollData(inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight);

    expect(scrollData.scrollAmount).toBe(-153.5);
    expect(scrollData.scrollTo).toBe(153.5);
    expect(scrollData.scrollPadding).toBe(0);
  });

  it('should not scroll, top in safe, bottom in safe', () => {
    // Input top within safe area, bottom within safe area
    let inputOffsetTop = 100;
    let inputOffsetHeight = 50;
    let scrollViewDimensions = {
      contentTop: 100,
      scrollTop: 0,
      keyboardTop: 400
    };
    let keyboardHeight = 400;

    let scrollData = TextInput.getScollData(inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight);
    expect(scrollData.noScroll).toBe(true);
  });

}