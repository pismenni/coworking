var $tf = false;
var $wi;
if (document.body.clientWidth>768){
	$wi = "320px";
} else {
	$wi = "640px";
}
function goToOrder() {
	if ($tf == false){
		$('.to-order').animate({height: $wi},400, function () {
			$('.line2').css({'display':'block', 'position':'relative', 'left':'140%'});
			$('.line2').animate({left: '0%'}, 700);
			$('#order-back-btn').css("display", "none");
			if (document.body.clientWidth<768) {
				$('.to-order').css("height", "auto");
			}
		});
		$tf = true;
	}
}

window.onresize = function () {
	$('.to-order').css("height", "auto");
	if (document.body.clientWidth>980){
		$('.to-order').css("height", "320px");
	}
}

$(document).ready(function(){

//console.log('332466');  //test

//ORDER BLOCK SLIDER	
	var orderBlock = $(".line2");
	var welcomeBlock = $(".line1");
    welcomeBlock.animate({left: '0%'}, 1000);
	$("[href='#order-form'], #order-btn").click(function(){ 
		if ( orderBlock.is(':visible')) return;
		welcomeBlock.animate({left: '-140%'}, 500, function(){
			welcomeBlock.hide();
			orderBlock.css({'display':'block', 'position':'relative', 'left':'140%'});
			orderBlock.animate({left: '0%'}, 500);
		})
	});
    
	$("#order-back-btn").click(function(){ 
		orderBlock.animate({left: '+140%'}, 500, function(){
			orderBlock.hide();
			welcomeBlock.css({'display':'block', 'position':'relative','left':'-140%'});
			welcomeBlock.animate({left: '0%'}, 500);
		})
	});

//SMOOTH SCROLL TO ANCHOR ON THE SAME PAGE (Add smooth scrolling to all links)							
  $("a").on('click', function(event) {
    if (this.hash !== "") {    // Make sure this.hash has a value before overriding default behavior
      event.preventDefault();      // Prevent default anchor click behavior
      var hash = this.hash;        // Store hash
      $('html, body').animate({		// Using jQuery's animate() method to add smooth page scroll
        scrollTop: $(hash).offset().top
      }, 800, function(){			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        window.location.hash = hash;        // Add hash (#) to URL when done scrolling (default click behavior)
      });
    } // End if
  });

//SELECT TOWN (JQUERY SELECT2)	
	$("#town-select").select2({
		placeholder: "Оберіть місто...",
		language: {noResults: function(){return "Співпадінь, не знайдено";}	},
		width: "100%"
	});

	$.ajaxSetup({ headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')} });

	$("#town-select").change(function() {
		var a = $(this).val();
		$.ajax({
			url: 'reservation/getplace',
			method: 'post',
			data: a,
			success: function (data) {
				if (data == ""){
					$("#place-select").empty().select2({
						placeholder: "Доступних місць немає",
						width: "100%"
					});
				} else {
					$("#place-select").empty().select2({
						placeholder: "Оберіть простір...",
						width: "100%"
					}).append("<option></option>");
					
					$.each(data, function (index) {
						$("#place-select").append("<option value='"+data[index].id+"'>" + data[index].address + "</option>");
					})
				}
			}
		})
	});


//SELECT PLACE (JQUERY SELECT2)
	$("#place-select").select2({
		placeholder: "Оберіть простір...",
		language: {noResults: function(){return "Співпадінь, не знайдено";}	},
		width: "100%"
	});

//SELECT DISCOUNT (JQUERY SELECT2)	
	$("#discount-selector").select2({
		minimumResultsForSearch: Infinity,
		width: "100%"
	});

//PROMO-CODE-DIV APPEARANCE
	$("#discount-selector").on("change",function(){
		if ($(this).val() == "6")
			$("#promo-code-div").show();
		else
			$("#promo-code-div").hide();
	});
	
//DATAPICKER
	$( function() {
		var dateFormat = "dd.mm.yy",
			from = $( "#from" )
				.datepicker({
					defaultDate: 0,
					changeMonth: true,
					numberOfMonths: 1,
					minDate: 0
				})
				.on( "change", function() {
					to.datepicker( "option", "minDate", getDate( this ) );
				}),				
			to = $( "#to" ).datepicker({
					defaultDate: 0,
					changeMonth: true,
					numberOfMonths: 1,
					minDate: 0
				})
				.on( "change", function() {
					from.datepicker( "option", "maxDate", getDate( this ) );
				});
	 
		function getDate( element ) {
			var date;
			try {
				date = $.datepicker.parseDate( dateFormat, element.value );
			} catch( error ) {
				date = null;
			}
			return date;
		}
	} );

//NUM-OF-PLACES-SELECTOR
	$("#plus-btn").click(function(){
		var value = $("#num-of-places-input").val();
		value = parseInt(value);
		if (!isNaN(value) && value >=1)
			$("#num-of-places-input").val(++value);
		else 
			$("#num-of-places-input").val(1);
	});
	$("#minus-btn").click(function(){
		var value = $("#num-of-places-input").val();
		value = parseInt(value);
		if (!isNaN(value)  && value >=2)
			$("#num-of-places-input").val(--value);
		else 
			$("#num-of-places-input").val(1);
	});
	$("#num-of-places-input").on( "change", function() {
		var value = $("#num-of-places-input").val();
		value = parseInt(value);
		if (isNaN(value)  || value <1)
			$("#num-of-places-input").val(1);
		else 
			$("#num-of-places-input").val(value);
	});
	
});