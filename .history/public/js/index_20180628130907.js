let indexVM = new Vue( { // eslint-disable-line
	el   : '#content',
	data : {
		greeting : 'Hello world!'
	}
} );

const simpsonData = [{ name : 'Mr. Burns', times : 160 },
					 { name : 'Moe Szyslak', times : 140 },
					 { name : 'Ned Flanders', times : 110 },
					 { name : 'Milhouse', times : 108 },
					 { name : 'Seymour Skinner', times : 107 },
					 { name : 'Krusty The Klown', times : 105 },
					 { name : 'Chief Wiggum', times : 88 },
					 { name : 'Grampa', times : 79 },
					 { name : 'Lenny', times : 77 },
					 { name : 'Carl', times : 75 },
					 { name : 'Selma', times : 70 },
					 { name : 'Dr. Hibbert', times : 65 },
					 { name : 'Nelson', times : 55 },
					 { name : 'Barney', times : 54 },
					 { name : 'Waylon Smithers', times : 52 }];

const donutChart = () => {


var text = '';

var width     = 260;
var height    = 260;
var thickness = 40;

var radius = Math.min( width, height ) / 2;

var color = d3.scaleOrdinal( ['#ffcccc', '#ccf2ff', '#ccffcc', '#d9ccff'] );

var svg = d3.select( '#chart' )
            .append( 'svg' )
            .attr( 'class', 'pie' )
            .attr( 'width', width )
            .attr( 'height', height );

var g = svg.append( 'g' )
		   .attr( 'transform', `translate(${width / 2},${height / 2})` );
		   g
				.append( 'text' )
                .attr( 'class', 'name-text' )
                .text( ' ' )
                .attr( 'text-anchor', 'middle' )
                .attr( 'dy', '-.5em' )
                .attr( 'fill', 'white' );

              g
                .append( 'text' )
                .attr( 'class', 'value-text' )
                .text( ' ' )
                .attr( 'text-anchor', 'middle' )
                .attr( 'dy', '1.5em' )
                .attr( 'fill', 'white' );

var arc = d3.arc()
            .innerRadius( radius - thickness )
            .outerRadius( radius );

var pie = d3.pie()

            .value( d => d.times )

            .sort( null );

var path = g.selectAll( 'path' )
            .data( pie( simpsonData ) )
            .enter()
            .append( 'g' )

            .on( 'mouseover', function ( d ) {
              let gg = d3
                .select( this )
                .style( 'cursor', 'pointer' )
                .append( 'g' )
				.attr( 'class', 'text-group' );
				g
					.select( '.name-text' )
					.text( d.data.name );
				g
					.select( '.value-text' )
					.text( d.data.times );
            } )

            .on( 'mouseout', function ( d ) {
                d3.select( this )
                  .style( 'cursor', 'none' );
            } )

            .append( 'path' )
            .attr( 'd', arc )
            .attr( 'fill', ( d, i ) => color( i ) )
            .on( 'mouseover', function ( d ) {
              d3.select( this )
                .style( 'cursor', 'pointer' )
                .style( 'fill', color( this._current ) )
                .style( 'opacity', 0.8 );
            } )
            .on( 'mouseout', function ( d ) {
              d3.select( this )
                .style( 'cursor', 'none' )
                .style( 'fill', color( this._current ) )
                .style( 'opacity', 1 );
            } )
            .each( function ( d, i ) {
              this._current = i;
			} );
};

donutChart();

const radialProgress = () => {

	const height    = 350;
	const width     = 350;
	const count     = 0;
	const progress  = 0;
	const thickness = 40;
	const endAngle  = Math.PI * 2;

	let biggestVal = 0;
	let currentVal = 0;

	for ( let i = 0; i < simpsonData.length; i += 1 ) {
		if ( biggestVal < simpsonData[i].times ) {
			biggestVal = simpsonData[i].times;
		}
		console.log( biggestVal );
	}

	currentVal = simpsonData[1].times / biggestVal;

	console.log( currentVal );

	var radius = Math.min( width, height ) / 2;

	const circle = d3.arc()
					.startAngle( 0 )
					.innerRadius( radius )
					.outerRadius( radius - thickness );

	const svg = d3.select( '#radial' )
				  .append( 'svg' )
				  .attr( 'width', width )
				  .attr( 'height', height );

	const g = svg.append( 'g' )
				 .attr( 'transform', `translate(${width / 2} , ${height / 2})` );

	const container = g.append( 'path' )
					   .attr( 'd', circle.endAngle( endAngle ) )
					   .attr( 'fill', '#373737' );

	const path = g.append( 'path' )
				  .attr( 'fill', 'skyblue' )
				  .attr( 'd', circle.endAngle( endAngle * currentVal ) );

	const text = g.append( 'text' )
				  .text( d3.format( '.0%' )( currentVal ) )
				  .attr( 'text-anchor', 'middle' )
				  .attr( 'font-size', '24px' );

};

radialProgress();
