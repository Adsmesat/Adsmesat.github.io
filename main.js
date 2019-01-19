$('.setupNew').on('click', function() {createMatrix($('.X')[0].value);})
$('.calculate').on('click', function(){ calculate();})
$('.fillUp').on('click', function(){fill();})
var S = [];
var Base = [];

function createMatrix(size)
{
	matrix_count++;
	align = document.createElement('div');
	align.className = 'matrix-align';

	matrix = document.createElement('div');
	matrix.className = "matrix "+ matrix_count;

	align.append(matrix)


	for(var i = size; i > 0; i--)
	{
		var br = document.createElement("br");
		
		for(var j = size; j > 0; j--)
		{
			var el = document.createElement("input");
			//el.setAttribute('maxlength',3)
			el.className= 'el'
			el.style.border = '2px solid black';
			matrix.append(el);
			
		}
		matrix.append(br)
	}

	$("#solution-form").append(align)

	$('.el').on('click', function(){$( this )[0].value = '';})
}

function calculate()
{
	var size = $('.X')[0].value;
	for(var i = 0; i < size; i++)
		Base[i] = new Array(size)
	var k = -1;
	for(var i = 0; i < size; i++)
	{
		for(var j = 0; j < size; j++)
		{
			k++;
			if ($('.el')[k].value != '-' && $('.el')[k].value != '')
				Base[i][j] = +$('.el')[k].value;
			else
				Base[i][j] = 1000;
		}
	} 

		for (var j = 0; j < size; j++) {
			console.log(Base[j]);
		}
	
	for(var k = 0; k < size; k++)
	{
		if(k === 0)
		{
				for(var i = 0; i < size; i++)
				{
					S[i] = [];
					
				}
				for(var i = 0; i < size; i++)
				for(var j = 0; j < size; j++)
						S[j][i] = i+1; 
		}

		p = document.createTextNode('D: '+k);
		var br = document.createElement('br');
		$('#solution-form').append(p);

		matrix_into_dom(Base);
		$('#solution-form').append(br);
		$('#solution-form').append(br);
		
		
		prev = Base;
		p = document.createTextNode('S: '+k)
		$('#solution-form').append(p);
		matrix_into_dom(S);
		var br = document.createElement('br');
		$('#solution-form').append(br);
		$('#solution-form').append(br);
		
		for(var i = 0; i < size; i++)
	    for(var j = 0; j < size; j++)
	    {	
	        if(Base[i][k] + Base[k][j] < 100 && i != j)
	    	  {
	    	  	  if(Math.min(Base[i][j], Base[i][k] + Base[k][j]) == Base[i][k] + Base[k][j] && Base[i][j] != (Base[i][k] + Base[k][j]))
	    	  		{
	    	  			S[i][j] = k+1;
	    	  		}
	    	  	  Base[i][j] = Math.min(Base[i][j], Base[i][k] + Base[k][j]);
	    	  }
	    	  
	    }


	}

	var br = document.createElement('br');
	var p = document.createTextNode('Final anwser - D' + (k)+":") ;
	$('#solution-form').append(br);
		$('#solution-form').append(br);
		$('#solution-form').append(br);
	
	$('#solution-form').append(p);
		
	matrix_into_dom(Base);
	var br = document.createElement('br');
	var p = document.createTextNode('Final anwser - S' + (k)+":") ;
	$('#solution-form').append(br);
		$('#solution-form').append(br);
		$('#solution-form').append(br);
	
		$('#solution-form').append(p);
	
	matrix_into_dom(S);

		$('.matrix-align').remove();
		$('.el').remove();
		$('input').remove();
		$('button').remove();
		$('.input-group-prepend').remove();

}

function matrix_into_dom(m)
{

		var br = document.createElement("br");
	$('#solution-form').append(br);
	$('#solution-form').append(br);

	var size =  Math.sqrt($('.el').length);
	for(var i = 0; i < size; i++)
	{
		var row = "";
		for(var j = 0; j < size; j++)
		{
			if(m[i][j] == 1000)
				row += "   #   ";
			else
				row += "   "+m[i][j]+"   ";
		}

		var br = document.createElement("br");
		p = document.createTextNode(row)
	
		$('#solution-form').append(p);
		$('#solution-form').append(br);
		
		$('.m-row '+$('.m-row').length.toString()).textContent = row.toString();		
		}
}


function fill()
{
	var size = $('.X')[0].value;
	for(var i = size*size; i > 0; i--)
		$('.el')[i-1].value = '-';
}

document.addEventListener('keydown', function(event) {
  if (event.code == 'Enter' ) {
 	createMatrix($('.X')[0].value);
  }

  else if (event.code == 'Digit7')
  {
  	$('#Size')[0].value = '7';
  }

});

var matrix_count = 0;