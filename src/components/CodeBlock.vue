<template>
  <pre class="code-block" :class="languageClass">
    <code ref="codeElement" :class="languageClass" v-html="highlightedCode"></code>
  </pre>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import 'prismjs/themes/prism-okaidia.css'

export default {
  props: {
    code: {
      type: String,
      required: true
    },
    language: {
      type: String,
      default: 'javascript'
    }
  },
  setup(props) {
    const highlightedCode = ref('')
    const languageClass = `language-${props.language}`

    const highlight = () => {
      highlightedCode.value = Prism.highlight(
          props.code,
          Prism.languages[props.language] || Prism.languages.javascript,
          props.language
      )
    }

    watch(() => props.code, highlight, { immediate: true })
    watch(() => props.language, highlight)
    onMounted(highlight)

    return {
      highlightedCode,
      languageClass
    }
  }
}
</script>


<style scoped>
.code-block {
  border-radius: 14px;
  max-width: 800px;
  margin: 20px auto;
  background: rgba(45, 45, 45, 0.8);
  backdrop-filter: blur(2px);
  color: #f8f8f2;
  font-family: 'Fira Code', monospace, monospace;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.3);
  user-select: text;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 0;
}

.code-block code{
  margin: 0 40px;
  object-fit: contain;
  display: block;
}

.code-block:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 30px rgba(204, 122, 102, 0.5);
}

</style>
