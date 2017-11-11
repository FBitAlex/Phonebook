<template>
<div>
	<nav class="panel column is-offset-2 is-8">
	  <p class="panel-heading">
		Events
		<button class="button is-primary is-outlined is-pulled-right" @click="openModal('add')">
			Add New
		</button>
		<span class="is-pulled-right" v-if="loading">
			<i class="fa fa-refresh fa-spin fa-fw has-text-primary"></i>
		</span>
	  </p>
	  <div class="panel-block">
		<p class="control has-icons-left">
		  <input class="input is-small" type="text" placeholder="search" v-model="searchQuery">
		  <span class="icon is-small is-left">
			<i class="fa fa-search"></i>
		  </span>
		</p>
	  </div>
	<!--   <p class="panel-tabs">
		<a class="is-active">All</a>
		<a>Harimnama</a>
		<a>Sankirtana</a>
		<a>Event 1</a>
		<a>Event 2</a>
	  </p> -->
	  <a class="panel-block is-active" v-for="item,key in temp">
		<span class="column is-9">
			{{item.name}} <!-- [{{item.phone}}] {{item.email}} -->
		</span>
		<span class="panel-icon column is-1">
			<i class="has-text-danger fa fa-trash fa-2x" aria-hidden="true" @click="del(key, item.id)"></i>
		</span>
		<span class="panel-icon column is-1">
			<i class="has-text-info fa fa-edit fa-2x" aria-hidden="true" @click="openModal('update', key)"></i>
		</span>
		<span class="panel-icon column is-1">
			<i class="has-text-primary fa fa-eye fa-2x" aria-hidden="true" @click="openModal('show', key)"></i>
		</span>

	  </a>
	<!--   <div class="panel-block">
		<button class="button is-link is-outlined is-fullwidth">
		  reset all filters
		</button>
	  </div>
	 -->
	</nav>

 	<add :showModal="activeModal" @closeModal="closeModal()"></add>
	<show :showModal="activeModal" @closeModal="closeModal()"></show>
	<update :showModal="activeModal" @closeModal="closeModal()"></update>
</div>
</template>

<script>
	let add = require('./add.vue');
	let show = require('./show.vue');
	let update = require('./update.vue');

	export default {
		components: {add, show, update},

		data(){
			return {
				lists 		: {},
				errors 		: {},
				loading		: false,
				searchQuery	: '',
				temp		: '',
				activeModal : { modal:'', data:{} },
			}
		},

		watch : {
			searchQuery(){
				if ( this.searchQuery.length > 0 ) {
					this.temp = this.lists.filter( (item) => {
						return Object.keys(item).some( (key) => {
							let string = String(item[key]);
							return string.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
						});
					});
				} else {
					this.temp = this.lists;
				}
			}
		},

		mounted(){

			axios.post('/getData')
			.then(  response 	=> this.lists = this.temp = response.data )
			.catch( error 		=> this.errors = error.response.data.errors );
		},

		methods: {
			closeModal(){
				this.activeModal.modal = '';
				this.activeModal.data = {};
			},

			openModal( modal, key = 0 ){
				this.activeModal.modal = modal;
				this.activeModal.data = this.temp[key];
			},

			del( key, id ){
				this.loading = true;
				if ( confirm("Fre you shure?") ) {
					axios.delete(`/phonebook/${id}`)
					.then(  response 	=> {this.lists.splice(key, 1); this.loading = false} )
					.catch( error 		=> this.errors = error.response.data.errors );
				} else {
					this.loading = false;
				}
			},
		}
	}
</script>

<style scoped>
	.fa-2x {
		font-size: 2em !important;
	}
</style>