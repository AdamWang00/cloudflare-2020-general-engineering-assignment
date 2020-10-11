const root = 'https://worker.awang.workers.dev';
const staticUrl = 'https://static-links-page.signalnerve.workers.dev';
const avatarUrl = 'https://brownamdug.com/static/images/adam_pfp.jpg';
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
		"svg": '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub icon</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
	},
	{
		"url": "https://www.linkedin.com/in/adamwang3/",
		"svg": '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn icon</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
	},
	{
		"url": "https://www.quora.com/profile/Adam-Wang-91",
		"svg": '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Quora icon</title><path d="M12.738 18.701c-.831-1.635-1.805-3.287-3.708-3.287-.362 0-.727.061-1.059.209l-.646-1.289c.786-.678 2.058-1.214 3.693-1.214 2.544 0 3.851 1.229 4.888 2.792.613-1.335.904-3.14.904-5.375 0-5.582-1.744-8.447-5.822-8.447-4.018 0-5.757 2.865-5.757 8.447 0 5.553 1.739 8.389 5.757 8.389.64 0 1.22-.069 1.75-.225zm.996 1.947c-.881.237-1.817.366-2.743.366-5.352 0-10.59-4.269-10.59-10.478C.402 4.271 5.639 0 10.991 0c5.441 0 10.628 4.238 10.628 10.537 0 3.504-1.635 6.351-4.01 8.191.764 1.148 1.543 1.914 2.652 1.914 1.199 0 1.68-.915 1.77-1.649h1.557c.092.974-.402 5.007-4.766 5.007-2.652 0-4.047-1.528-5.096-3.328l.008-.024z"/></svg>',
	},
];

class LinksTransformer {
	async element(element) {
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

class ProfileTransformer {
	async element(element) {
		element.removeAttribute('style');
	}
}

class AvatarTransformer {
	async element(element) {
		element.setAttribute('src', avatarUrl);
	}
}

class NameTransformer {
	async element(element) {
		element.setInnerContent(name);
	}
}

class TitleTransformer {
	async element(element) {
		element.setInnerContent(title);
	}
}

class BodyTransformer {
	async element(element) {
		element.setAttribute('style', 'background-color: #CC9E00;');
	}
}

class SocialTransformer {
	async element(element) {
		element.removeAttribute('style');
		socialLinks.forEach(socialLink => {
			element.append(`
				<a target="_blank" href=${socialLink.url}>
					${socialLink.svg}
				</a>
				`, { html: true }
			);
		})
	}
}

const rewriter = new HTMLRewriter()
	.on("div#links", new LinksTransformer())
	.on("div#profile", new ProfileTransformer())
	.on("img#avatar", new AvatarTransformer())
	.on("h1#name", new NameTransformer())
	.on("title", new TitleTransformer())
	.on("body", new BodyTransformer())
	.on("div#social", new SocialTransformer())

async function handleRequest(request) {
	if (request.url == root + '/links') {
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