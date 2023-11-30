<!--The templet is for the upload please read all comments carefully-->
<template>
  <div>
    <div v-if="imagePreview" class="image-preview">
      <img :src="imagePreview" alt="Profile Picture Preview" class="rounded-full" />
    </div>
    <!--This is for the file upload that will work with the images-->
    <div class="fileUpload">
      <span style="color: rgb(5, 129, 5)">
        <input type="file" @change="handleFileUpload" accept="image/*" />
      </span>
    </div>
    <!--This will help clear images with a button-->
    <div class="clearButton">
      <button class="bg-red-700 text-white rounded" @click="uploadImage">Upload Image</button>
      <br>
      <br>
      <button class="bg-red-700 text-white rounded" @click="clearImage">Clear</button>
    </div>

  </div>
</template>
  
  <!--This is the script that will be used for the Upload-->
<script>

import axios from 'axios';

const backendApi = axios.create({
  baseURL: 'http://127.0.0.1:3000/clients', // Replace with your actual backend API URL
});

export default {
  props: {
    value: String, // Use v-model to bind the profile picture URL
  },
  data() {
    return {
      selectedFile: null, //The data of the selected profile
      imagePreview: null, //This is the data for the image previews
      filePath: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.selectedFile = event.target.files[0];
      this.previewImage();
      const newPath = 'backend/Photos/' + file.name;
      // Adjust this based on your file storage logic
      this.filePath = newPath;
      this.$emit('file-uploaded', newPath); // Emit an event to notify the parent component

    },

    async uploadImage() {
      try {
        const formData = new FormData();
        formData.append('file', this.selectedFile);

        const response = await backendApi.post('/upload', formData);
        const newPath = response.data.filePath;
        this.filePath = newPath;
        this.previewImage();
        this.$emit('file-uploaded', newPath);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    },

    previewImage() {
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(this.selectedFile); //This entire section is for 'reading' the image
        this.$emit("input", null); // Clear the profile picture URL when a new file is selected
      }
    },

    clearImage() {
      this.selectedFile = null;
      this.imagePreview = null;
      this.$emit("input", null); // Clear the profile picture URL
    },
  },
};
</script>
  
