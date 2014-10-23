var runScholzly, soMax, soMin, soCounter;

randomInt = function(a,b) {
  // create integer in range [a,b)
  return a + Math.floor((b-a)*Math.random());
}

punctuation = function() {
  // generate first piece of punctuation
  var num = randomInt(0,3),
    punc;

  switch(num) {
    case 0:
      punc = ' ';
      break;

    case 1:
      punc = ', ';
      break;

    case 2:
      punc = '... ';
      break;
  }
  return punc;
}

createSoString = function(delim) {
  // create string of so's based off of a delimiter
  while (true) {
    var num = randomInt(0,soMax+1);
    if (soCounter + num <= soMax && soCounter + num >= soMin)
      break;
  }
  soCounter += num;

  var arr = new Array(num);
  for (var i=0; i<arr.length; i++)
    arr[i] = "so";
  return (arr.length !== 0) ? arr.join(delim) + " " : "";
}

soGenerator = function() {
  // yep
  soCounter = 0;
  var result = punctuation();

  while (soCounter < soMax && soCounter < soMin) {
    var num = randomInt(0,3);
    switch(num) {
      case 0:
        // create space-delimited so-string
        result += createSoString(" ");
        break;

      case 1:
        // create comma-delimited so-string
        result += createSoString(", ");
        break;

      case 2:
        // create ellipsis-delimited so-string
        result += createSoString("... ");
        break;
    }
  }
  return result;
}

scholzifyText = function(text) {
  // update the text with so's
  var reUncap1 = / so[^\.]\.{1}[^\.]/, // "Okay, so."
  reUncap2 = / so,/,               // "It's neat, so, yeah."
  reUncap3 = / so /,               // "It's so cool."
  reStart1 = /^So[^\.]\.{1}[^\.]/, // "So. Derp." (start of string)
  reStart2 = /^So,/,               // "So, hello." (start of string)
  reStart3 = /^So /,               // "So yeah." (start of string)
  reCap1 = / So[^\.]\.{1}[^\.]/,   // "Derp. So."
  reCap2 = / So,/,                 // "Hello. So, I see."
  reCap3 = / So /,                 // "And yeah. So then..."
  res = [reUncap1, reUncap2, reUncap3, reStart1, reStart2, reStart3, reCap1, reCap2, reCap3],
  strs = [' so', 'So', ' So'];

  for (var i=0; i<res.length; i++) {
    var re = res[i],
      arr = text.split(re),
      S = arr[0];

    for (var j=1; j<arr.length; j++)
      S += strs[Math.floor(i/3)] + soGenerator() + arr[j];

    text = S;
  }
  return text;
} 

$(window).load(function() {

  chrome.storage.local.get(['SCHOLZLY_RUN_FLAG', 'SCHOLZLY_MAX', 'SCHOLZLY_MIN'], function(obj) {
    runScholzly = (obj["SCHOLZLY_RUN_FLAG"] === undefined) ? true : JSON.parse(obj['SCHOLZLY_RUN_FLAG']);
    soMax = (obj["SCHOLZLY_MAX"] === undefined) ? 4 : parseInt(obj["SCHOLZLY_MAX"]);
    soMin = (obj["SCHOLZLY_MIN"] === undefined) ? 1 : parseInt(obj["SCHOLZLY_MIN"]);

    if (runScholzly) {     

      editTags = function(tag) {
        // this function 
        var tagName = tag[0].nodeName;

        if (tagName === 'SCRIPT' || tagName === 'STYLE')
          return;

        if (tag.find('script').length === 0) {
          // tag doesn't have any script tags - should be smooth sailing
          tag.html(scholzifyText(tag.html()));

        } else {
          // tag does have script tags - work on that
          var children = tag.children();
          for (var i=0; i<children.length; i++) {
            editTags($(children[i]));
          }
        }
      }

      editTags($('body'));
    }
  });
});