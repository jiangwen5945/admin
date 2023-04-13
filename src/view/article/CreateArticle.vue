<template>
  <div class="page">
    <el-form ref="form" :model="form" label-width="80px">
      <!-- 文章标题 -->
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>

      <!-- 文章标题 -->
      <el-form-item label="作者" prop="title">
        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>

      <!-- 类型 -->
      <el-form-item label="类型" prop="status">
        <el-select v-model="form.level" placeholder="请选择分类等级" style="width: 100%;">
          <el-option label="一级分类" :value="1"></el-option>
          <el-option label="二级分类" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <!-- 封页图片 -->
      <el-form-item label="封页图片" prop="author">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
          :file-list="form.fileList" :on-remove="handleRemove" :on-success="handleUploadSuccess"
          :before-upload="handleBeforUpload" ref="uploadRef">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <!-- 内容 -->
      <el-form-item label="内容" prop="content">
        <quillEditor
          class="editor"
          @change="onEditorChange($event)"
          ref="quill"
          v-model="form.content"
          :options="editorOption"
        />
      </el-form-item>


    </el-form>

  </div>
</template>
 
<script>
import { quillEditor } from "vue-quill-editor";
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'CreateArticle',
  components: {
    quillEditor
  },
  data() {
    return {
      form: {
        content:'',
        fileList: [], // 上传完成文件地址数组（编辑回显时需要）
      },
      isComplete: true, // 文件上传是否完成
      editorOption: {
        theme: "snow",
        placeholder: "请输入正文",
      },
    };
  },
  methods: {
    // 上传文件之前
    handleBeforUpload(file) {
      console.log('上传文件之前', file);
      this.isComplete = false
    },

    // 文件上传成功时
    handleUploadSuccess(res, file, fileList) {
      this.isComplete = true
      // this.form.fileList.push(file) // 添加到上传的文件列表
      this.form.fileList = JSON.parse(JSON.stringify(fileList))
      this.$refs.uploadRef.clearFiles() // 清空已上传的文件列表
    },

    // 文件列表移除文件时
    handleRemove(file, fileList) {
      console.log('文件列表移除文件时', file, fileList);
      this.form.fileList = JSON.parse(JSON.stringify(fileList))
    },

    onEditorChange(){}

  }
}
</script>
 
<style scoped lang="scss">
.editor {
  line-height: normal !important;
  height: 350px;
  p{
    line-height: 1.5em;
  }
}
</style>
 