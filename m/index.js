// Generated by CoffeeScript 1.3.3
(function() {

  $(document).bind('pageinit', function() {
    var i, sym, syms, _i, _len;
    setInterval(function() {
      return $('#cursor').css('visibility', $('#cursor').css('visibility') === 'hidden' ? 'visible' : 'hidden');
    }, 500);
    syms = '+−×÷←◇⍳⍴\n⍺⍵∈⍷⌈⌊∣?\n!⋆⍟⊖⌽⍉○⌹\n∨∧∇∆⍒⍋∪∩\n⊤⊥⊢⊣.,⊂⊃\n⍕⍎<>∘⍪/\n=≠≤≥≡≢⌿⍀\n¨⍣'.replace(/[ \t\n\r]+/g, '');
    for (i = _i = 0, _len = syms.length; _i < _len; i = ++_i) {
      sym = syms[i];
      $("<a class='sym' href='#'\ndata-role='button'\ndata-icon='apl" + i + "'\ndata-iconpos=\"notext\"\ndata-sym=\"" + sym + "\"\n></a>").button().appendTo('#syms');
    }
    $('.sym').live('tap', function() {
      $("<img data-sym='" + ($(this).data('sym')) + "' src='images/" + ($(this).data('icon')) + ".png' />").insertBefore('#cursor');
      return false;
    });
    $('#backspace').bind('tap', function() {
      $('#cursor').prev().remove();
    });
    $('#exec').bind('tap', function() {
      console.info(($('#editor img').map(function() {
        return $(this).data('sym');
      })).get().join(''));
    });
    return $('#editor img').live('tap', function(e) {
      $('#cursor').insertAfter(this);
      return false;
    });
  });

}).call(this);
