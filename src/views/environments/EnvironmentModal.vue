<template>
  <div>
    <q-modal no-backdrop-dismiss ref="modal" :content-css="{padding: '35px', minWidth: '75vw'}">
      <h5>Ajout d'un environement</h5>
      <div class="row md-gutter no-vert-gutter">
        <div class="col-6">
          <q-field>
            <q-input
              float-label="Nom"
              v-model="env.name"
            ></q-input>
          </q-field>
        </div>
        <div class="col-6">
          <q-field>
            <q-input
              float-label="Url"
              v-model="env.url"
            ></q-input>
          </q-field>
        </div>
        <div class="col-6">
          <q-field>
            <q-select
              v-model="env.authType"
              float-label="Type d'autentification"
              :options="envAuthTypesOptions"
            />
          </q-field>
        </div>
        <div v-if="env.authType === envAuthTypes.bearer.key" class="col-6">
          <q-field>
            <q-input
              float-label="Tenant Id"
              v-model="env.tenantId"
            ></q-input>
          </q-field>
        </div>
        <div v-if="env.authType === envAuthTypes.bearer.key" class="col-6">
          <q-field>
            <q-input
              float-label="Client Id"
              v-model="env.clientId"
            ></q-input>
          </q-field>
        </div>
        <div v-if="env.authType === envAuthTypes.bearer.key" class="col-6">
          <q-field>
            <q-input
              float-label="Client Secret"
              v-model="env.clientSecret"
            ></q-input>
          </q-field>
        </div>
        <div v-if="env.authType === envAuthTypes.bearer.key" class="col-6">
          <q-field>
            <q-input
              float-label="Resource"
              v-model="env.resource"
            ></q-input>
          </q-field>
        </div>
        <div v-if="env.authType === envAuthTypes.bearer.key" class="col-6">
          <q-field>
            <q-input
              float-label="Certificate"
              v-model="env.cert"
            ></q-input>
          </q-field>
        </div>
        <div v-if="env.authType === envAuthTypes.bearer.key" class="col-6">
          <q-field>
            <q-input
              float-label="Certificate Password"
              v-model="env.certPassword"
            ></q-input>
          </q-field>
        </div>
        <div v-if="env.authType === envAuthTypes.ntlm.key" class="col-6 self-center">
          <q-checkbox label="Use current user" v-model="env.useCurrentUser"></q-checkbox>
        </div>
        <div v-if="!env.useCurrentUser && env.authType === envAuthTypes.ntlm.key" class="col-6">
          <q-field>
            <q-input
              float-label="Utilisateur"
              v-model="env.username"
            ></q-input>
          </q-field>
        </div>
        <div v-if="!env.useCurrentUser && env.authType === envAuthTypes.ntlm.key" class="col-6">
          <q-field>
            <q-input
              float-label="Mot de passe"
              v-model="env.password"
              type="password"
            ></q-input>
          </q-field>
        </div>
      </div>
      <br>
      <q-btn class="float-right" color="primary" @click="createEnvironment()">Ajouter l'environement</q-btn>
    </q-modal>
  </div>
</template>

<script>
  import {
    QBtn,
    QCheckbox,
    QField,
    QInput, QItem, QItemMain, QItemSeparator, QItemSide, QItemTile, QList,
    QModal,
    QSelect
  } from 'quasar-framework'
  import { envAuthTypes } from 'utils/enums'
  import settings from 'electron-settings'
  import { UPDATE_ENVIRONMENTS } from 'store/mutation-types'

  export default {
    components: {
      QModal,
      QField,
      QInput,
      QCheckbox,
      QBtn,
      QSelect,
      QList,
      QItem,
      QItemSide,
      QItemMain,
      QItemTile,
      QItemSeparator
    },
    data () {
      return {
        env: {
          name: '',
          url: '',
          authType: null,
          useCurrentUser: false,
          username: '',
          password: '',
          tenantId: '',
          clientId: '',
          clientSecret: '',
          resource: '',
          cert: '',
          certPass: ''
        },
        envAuthTypes: envAuthTypes,
        envAuthTypesOptions: envAuthTypes.get().map(t => { return {label: t.label, value: t.key} })
      }
    },
    methods: {
      open () {
        this.$refs.modal.open()
      },
      close () {
        this.$refs.modal.close()
      },
      createEnvironment () {
        const environments = settings.get('environments') || []
        environments.push(this.env)
        settings.set('environments', environments)
        this.$store.commit(UPDATE_ENVIRONMENTS, environments)
        this.close()
      }
    },
    mounted () {
      console.log(this.envAuthTypesOptions)
    }
  }
</script>
