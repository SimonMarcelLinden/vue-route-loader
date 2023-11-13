import { Options, Vue } from 'vue-class-component';

@Options({
	name: "404",
	components: {},
	meta: {
		title: '404 - Page not found',
		tags: [
			{ name: 'author', value: 'Simon Mrcel Linden' },
			{ name: 'description', value: '404 - Page not found.' },
			{ name: 'og:description', value: '404 - Page not found.' }
		],
	},

})
export default class Error404Page extends Vue {

}