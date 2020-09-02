<template>
   <div v-if="showEditor" class='editor' id='twoEditor'>
      <tinymceEditor v-model='municiInfo.content' :id="editorId"  :init="init"></tinymceEditor>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/mobile/theme'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import qs from 'qs'
import axios from 'axios'
import baseUrl from '../../../../../../utils/config'
export default {
  name: 'municiEditor',
  props: ['municiInfo','isViewHtml'],
  data () {
    return {
      tinymceHtml: '请输入内容',
      editorId: 'annEditor',
      showEditor:false,
      //url:'/epf-document/document/upload',
      init: {
        language_url: process.env.NODE_ENV == 'development'?'/static/tinymce/langs/zh_CN.js':'/epf_admin/static/js/langs/zh_CN.js',
        language: 'zh_cn',
        skin_url: process.env.NODE_ENV == 'development'?'/static/tinymce/skins/ui/oxide':'/epf_admin/static/js/skins/ui/oxide',
        height: 500,
        plugins: [
                   "advlist autolink lists link image charmap preview",
                   "searchreplace visualblocks fullscreen",
                   "insertdatetime media table contextmenu paste",
                   "emoticons textcolor"
               ],
        toolbar1: "undo redo | styleselect | fontselect | fontsizeselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
        toolbar2: "fullscreen preview | forecolor backcolor emoticons | table | link image media | mybutton",
        branding: false,
        images_upload_url: '/epf-document/document/upload',
        images_upload_handler: function(blobInfo, success, failure) {
              var form = new FormData(); 
              form.append('files', blobInfo.blob(), blobInfo.filename());
              axios.post(baseUrl.baseURL1 + '/epf-document/document/upload',form).then(res => {
                if(res.state != 'SUCCESS'){
                  alert("图片上传失败")
                }
                var location=baseUrl.baseURL1 + '/epf-document/document/downloadById?id='+res.data[0].id;
                success(location);
              });
          },
          file_picker_callback: function(callback, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.onchange = function() {
                var file = this.files[0];
                var form = new FormData();
                form.append("files", file); 
                 axios.post(baseUrl.baseURL1 + '/epf-document/document/upload',form).then(res => {
                  if(res.state != 'SUCCESS'){
                    alert("图片上传失败");
                    files.onError();
                    return null
                  }
                  var location=baseUrl.baseURL1 + '/epf-document/document/downloadById?id='+res.data[0].id;
                  callback(location,{text:res.data[0].name});
                }
                );
            };

            input.click();

        }
      }
    }
  },
  mounted () {
    this.showEditor = false
    if(this.$store.state.announcementEditor_Index){
      this.editorId = 'annEditor' + (this.$store.state.announcementEditor_Index + 1);
      this.$store.state.announcementEditor_Index++
    }else{
      this.$store.state.announcementEditor_Index = 1;
      this.editorId = 'annEditor' + 1;
    }
    setTimeout(()=>{
      this.showEditor = true
    },100)
    tinymce.init({})
  },
  activated() {
    this.showEditor = false
    if(this.$store.state.announcementEditor_Index){
      this.editorId = 'annEditor' + (this.$store.state.announcementEditor_Index + 1);
      this.$store.state.announcementEditor_Index++
    }else{
      this.$store.state.announcementEditor_Index = 1;
      this.editorId = 'annEditor' + 1;
    }
    setTimeout(()=>{
      this.showEditor = true
    },100)
    tinymce.init({})
  },
  methods:{
    viewHtml(){
      if(this.isViewHtml==false){
        this.isViewHtml=true
      }else{      
        this.isViewHtml=false
      }
    }
  },
  // components:{Editor}
}
</script>
<style lang="scss" scoped>
.htmlContent{
    width: 100%;
    height: auto;
    margin: 20px auto;
    // border: 1px solid rgb(216, 216, 216);
}
.tox-silver-sink{
      z-index: 2300;
}
</style>
