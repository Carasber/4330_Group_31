<!--Template showing the dialog box-->
<!-- This will show a @click event for the boxes and a {{Message}} which can be seen lower in the code-->
<template>
    <div v-if="show" class="dialog-background">
      <div class="dialog-content">
        <p>{{ message }}</p>
        <button @click="confirm" class="confirm-button">Yes</button> <!-- Button confirming Yes -->
        <button @click="cancel" class="cancel-button">No</button> <!-- Button confirming No -->
      </div>
    </div>
  </template>
  
  <script>

  //These are all the imports, look at them closely and how they related to other Vues
  import { useLoggedInUserStore } from "../store/loggedInUser";
  import useVuelidate from '@vuelidate/core'
  import { useToast } from 'vue-toastification';

  export default {
    props:{
      show: {
        type: Boolean,
        required: true
      },
      message: {
        type: String,
        default: "Are you sure you want to delete?" // This is the message that will appear on the confirmation Box
      }
    },

    data() {
      return {
        showDialog: false //It is false that way it does not show on screen until needed
      };
    },
    setup() {
    // register Vuelidate and loggedIn store
    const v$ = useVuelidate();
    const user = useLoggedInUserStore();
    const toast = useToast();
    return { v$, user, toast };
    },
    methods: {
      confirm() {
      this.$emit('confirmed');
      this.$emit('update:show', false);
    },
    cancel() {
      this.$emit('cancelled');
      this.$emit('update:show', false);
      }
    }
  };
  </script>
  

  <!-- This is the style information/CSS for the Delete Dialog -->
  <!-- NOTE: THESE HAVE REFRENCES PLEASE DO NOT CHANGE UNLESS -->
  <!-- ABSOLUTELY NEEDED AS IT WILL CAUSE ISSUES IN OTHER FILES -->
  <!-- ALL ARE NAMED ACCORDINGLY IF THERE ARE ANY CONFUSIONS STYLES ARE NAMED IN ORDER SHOWN BELOW-->
  <!-- Dialog Background (Meaning the background of the box in this case being black) -->
  <!-- Dialog Content (Meaning the inside of the box is white to show sentences cleary with black font or any other color)-->
  <!-- Confirm Button (Meaning to confirm in the dialog box it is green to signify a 'go ahead' action)-->
  <!-- Cancel Button (Meaning to cancel the confirmation in the dialof box it is red to signify a 'do not go ahead' action)-->

  <style scoped>
  .dialog-background { 
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialog-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  
  .confirm-button {
    background-color: #105810; 
    opacity: 1; 
    color: #ffffff; 
    border-radius: 0.25rem;
    margin: 0 10px; 
  }
  
  .cancel-button { 
    background-color: #EF4444;
    opacity: 1; /* By default */
    color: #ffffff; /* Text color white */
    border-radius: 0.25rem;
    margin: 0 10px; 
  }
  </style> 
