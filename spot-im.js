const script = ( id = 0, spotIMkey = '', hostname = '', ssl = true ) => `
    <html>
    <head>
    </head>
    <body>
        <script async src="https://recirculation.spot.im/spot/${ spotIMkey }"></script>
            <script
            async
            data-spotim-module="spotim-launcher"
            src="https://launcher.spot.im/spot/${ spotIMkey }"
            data-post-id="${ id }"
            data-livefyre-url="${ id }"
            data-post-url="${ ssl ? 'https://' : 'http://' }${ hostname }/?p=${ id }"
            >
        </script>
        <h1>${ id }</h1>
    </body>
    </html>
`;

module.exports = {
    spotIMscript: script
};

//sp_Hv5VZHKX
//https://nu-wp-tls-cms-uat-cma.elb.danda-dev.ntch.co.uk