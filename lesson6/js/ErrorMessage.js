Vue.component("error", {
    template: `<div class="error" v-show="$root.error">
                    <h1 style="text-align: center; color: red;">Can't connect to server</h1>
                </div>`
}) 