<template>
     <el-input disabled v-model="uploadName"></el-input>
</template>

<script>
export default {
    props:{
        uploadName:{
            type:String,
            default:'李添鑫'
        }
    }
}
</script>