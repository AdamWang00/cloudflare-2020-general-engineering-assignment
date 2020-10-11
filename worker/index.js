// Root url
const root = 'https://worker.awang.workers.dev';

// External urls
const staticUrl = 'https://static-links-page.signalnerve.workers.dev';
const avatarUrl = 'https://brownamdug.com/static/images/adam_pfp.jpg';
const backgroundUrl = 'https://mocah.org/uploads/posts/503135-blur-branch.jpg';

// Website data
const name = 'Adam Wang';
const title = 'Hello!';
const links = [
	{
		"name": "Personal Website",
		"url": "https://adamwang.xyz/",
	},
	{
		"name": "Noteflow Project",
		"url": "https://noteflow-bitrate.web.app/",
	},
	{
		"name": "Junk.ai Project",
		"url": "https://junk.ai/",
	},
	{
		"name": "Brown AMDUG Project",
		"url": "https://brownamdug.com/",
	},
];
const socialLinks = [
	{
		"url": "https://github.com/AdamWang00",
		"svg": "https://simpleicons.org/icons/github.svg",
	},
	{
		"url": "https://www.linkedin.com/in/adamwang3/",
		"svg": "https://simpleicons.org/icons/linkedin.svg",
	},
	{
		"url": "https://www.quora.com/profile/Adam-Wang-91",
		"svg": "https://simpleicons.org/icons/quora.svg",
	},
];

// Transformers and rewriters
class LinksTransformer {
	element(element) {
		links.forEach(link => {
			element.append(`
				<a target="_blank" href=${link.url}>
					${link.name}
				</a>
				`, { html: true }
			);
		})
	}
}

class SocialTransformer {
	element(element) {
		element.removeAttribute('style');
		socialLinks.forEach(socialLink => {
			element.append(`
				<a target="_blank" href=${socialLink.url}>
					<img src=${socialLink.svg} />
				</a>
				`, { html: true }
			);
		})
	}
}

const rewriter = new HTMLRewriter()
	.on("div#links", new LinksTransformer())
	.on("div#profile", { element: e => e.removeAttribute('style') })
	.on("img#avatar", { element: e => e.setAttribute('src', avatarUrl) })
	.on("h1#name", { element: e => e.setInnerContent(name) })
	.on("title", { element: e => e.setInnerContent(title) })
	.on("body", { element: e => e.setAttribute('style', `background: url(${backgroundUrl}) no-repeat center; background-size: cover;`) })
	.on("div#social", new SocialTransformer())

// Request handler (HTML and JSON)
async function handleRequest(request) {
	if (request.url === root + '/links') {
		return new Response(JSON.stringify(links, null, 2), {
			headers: { 'content-type': 'application/json;charset=UTF-8' },
		})
	} else {
		const page = await fetch(staticUrl);
		const transformed = rewriter.transform(page);
		const html = await transformed.text();
		return new Response(html, {
			headers: { 'content-type': 'text/html;charset=UTF-8' },
		})
	}
}

addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
})