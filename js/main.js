function deleteSignage() {
    for (const elem of document.querySelectorAll('img:not(.myImages)')) {
      elem.remove();
    }
    for (const elem of document.querySelectorAll('[id^=asumi-frame]')) {
      elem.remove();
    }
    for (const elem of document.querySelectorAll('[id^=zp]')) {
      elem.remove();
    }
    for (const elem of document.querySelectorAll('iframe')) {
      elem.remove();
    }
    for (const elem of document.querySelectorAll('a')) {
        elem.remove();
    }
}
