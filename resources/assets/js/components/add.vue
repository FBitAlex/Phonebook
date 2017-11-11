<template>
<div class="modal" :class="{'is-active' : showModal.modal == 'add'}">
	<div class="modal-background"></div>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">Add Event</p>
			<button class="delete" aria-label="close" @click="closeModal"></button>
		</header>
		<section class="modal-card-body">
			
			<div class="field">
				<label class="label">Name</label>
				<div class="control">
					<input class="input" :class="{'is-danger':errors.name}" type="text" placeholder="Name" v-model="list.name">
				</div>
				<small v-if="errors.name" class="has-text-danger">{{ errors.name[0] }}</small>
			</div>
			
			<div class="field">
				<label class="label">Phone</label>
				<div class="control">
					<input class="input" :class="{'is-danger':errors.name}" type="number" placeholder="Phone" v-model="list.phone">
				</div>
				<small v-if="errors.phone" class="has-text-danger">{{ errors.phone[0] }}</small>
			</div>

			<div class="field">
				<label class="label">Email</label>
				<div class="control">
					<input class="input" :class="{'is-danger':errors.name}" type="email" placeholder="Email" v-model="list.email">
				</div>
				<small v-if="errors.email" class="has-text-danger">{{ errors.email[0] }}</small>
			</div>

		</section>
		<footer class="modal-card-foot">
			<button class="button is-success" @click="save">Save</button>
			<button class="button" @click="closeModal">Cancel</button>
		</footer>
	</div>
</div>
</template>

<script>
	let add = require('./add.vue');

	export default {
	    props: ['showModal'],

		data(){
			return {
				list : {
					name 	: '',
					phone 	: '',
					email 	: '',
				},
				errors: {

				}
			}
		},

	    methods: {
	    	closeModal(){
	    		this.$emit('closeModal');
	    	},

	    	save (){
				axios.post('/phonebook', this.list)
				.then(  response 	=> {
					this.errors = "";
					this.closeModal();
					this.$parent.lists.push(response.data);
					this.$parent.lists.sort(function(a,b){
						return ( a.name > b.name ) ? 1 : -1;
					});
					this.list = '';
				})
				.catch( error => this.errors = error.response.data.errors );
	    	}
	    }
	}
</script>