const puppeteer = require( 'puppeteer' );
const express   = require( 'express' );
const fs        = require( 'fs' );
const spotIm    = require( './spot-im' );


/**
 * Setup variables.
 */
const app      = express();
const port     = 3000;
const ids      = fs.readFileSync( 'post-ids.txt' ).toString().split( '\n' );
const args     = process.argv.slice(2);
const headless = args.includes( '--headless' ) ? true : false;
let count      = 0;


/**
 * If there are no arguments or if a --help argument is passed
 * then show the usage and exit with status code 0.
 */
if ( '--help' === args[0] || 0 === args.length ) {
	console.log( '\x1b[41mUsage:\x1b[0m node crawl.js <spotIMKey> <hostname> [--headless]' );
	process.exit(0);
}


/**
 * If the arguments are less than 2 then show error and exit
 * with status code 1.
 */
if ( args.length < 2 ) {
	console.log( 'Arguments missing!' );
	process.exit(1);
}


/**
 * Route to localhost and listen on port 3000.
 */
app.get( '/', ( req, res ) => {
	res.send( spotIm.spotIMscript( req.query.id, args[0], args[1], true ) )
})

app.listen( port, () => console.log( `\nRequests are being listened on port ${ port }!\n` ) )


/**
 * Launch puppeteer and hit every URL with the id in the ids array.
 */
! ( async () => {

	const browser = await puppeteer.launch({
		headless: headless,
		executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
	});

	const page = await browser.newPage();

	for( let i = 0; i < ids.length; i++ ) {
		await Promise.all([
			page.waitForNavigation(),
			page.goto( `http://localhost:3000/?id=${ ids[ i ] }` ),
		])

		count++;

		console.log( `Loaded post: ${ ids[ i ] }` );
	}

	console.log( `\nAll ${ count } posts crawled.` );
})();
