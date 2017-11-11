<template>
<div class="modal" :class="{'is-active' : showModal.modal == 'show'}">
	<div class="modal-background"></div>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">Event Info</p>
			<button class="delete" aria-label="close" @click="closeModal"></button>
		</header>
		<section class="modal-card-body">
			<li class="panel-block">
				<label class="column is-2"><b>Name</b></label> {{ showModal.data.name }}
			</li>
			<li class="panel-block">
				<label class="column is-2"><b>Phone</b></label> {{ showModal.data.phone }}
			</li>
			<li class="panel-block">
				<label class="column is-2"><b>Email</b></label> {{ showModal.data.email }}
			</li>

		</section>
		<footer class="modal-card-foot">
			<button class="button" @click="closeModal">Cancel</button>
		</footer>
	</div>
</div>
</template>

<script>
	let show = require('./show.vue');

	export default {
		props: ['showModal'],

		data(){
			return {
				//list : {},
				errors: {

				}
			}
		},

		methods: {
			closeModal(){
				this.$emit('closeModal');
			},

		//  	save (){
				// axios.post('/phonebook', this.list)
				// .then(  response 	=> this.closeShow() )
				// .catch( error 		=> this.errors = error.response.data.errors );
		//  	}
		}
	}
</script>