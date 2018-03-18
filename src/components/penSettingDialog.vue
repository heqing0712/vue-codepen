<template>
  <div class="penSettingBox" style="display:none">
    <div class="pen-settings" id="pen-settings" >
      <div class="wrap">
        <div class="tab">
          <nav class="tab-menus">
            <a class="active" href="javascript:;" id="html-menu">
              Html
            </a>
            <a href="javascript:;" id="css-menu">
              Css
            </a>
            <a href="javascript:;"  id="js-menu">
              Javascript
            </a>
          </nav>
          
          <form id="form-settings">
            <div class="tab-cts">
              <div class="tab-ct active">
                <div class="form-item">
                  <h4 class="form-tit">
                    Html 文档类型
                  </h4>
                  <div class="form-ct">
                    <select name="HtmlDocType" v-model="HtmlDocType" class="j-insubmit">
                      <option value="1">
                        Html5 模式
                      </option>
                      <option value="2">
                        HTML 4.01 严格模式
                      </option>
                      <option value="3">
                        HTML 4.01 过度模式
                      </option>
                      <option value="4">
                        HTML 4.01 框架模式
                      </option>
                      <option value="5">
                        XHTML 1.0 严格模式
                      </option>
                      <option value="6">
                        XHTML 1.0 过渡模式
                      </option>
                      <option value="7">
                        XHTML 1.0 框架模式
                      </option>
                      <option value="8">
                        XHTML 1.1 严格模式
                      </option>
                    </select>
                  </div>
                </div>


                <div class="form-item">

                  <h4 class="form-tit">
                    Html 样式名称
                  </h4>
                  <div class="form-ct">
                    <input type="text" name="HtmlClassName" v-model="HtmlClassName" placeholder="class" class="j-insubmit" />
                  </div>
                </div>
                <div class="form-item">
                  <h4 class="form-tit">
                    Html head 头部
                  </h4>
                  <div class="form-ct">
                    <textarea name="HtmlHeadStuff" v-model="HtmlHeadStuff" class="j-insubmit" placeholder="&lt;meta&gt; or &lt;link&gt; or &lt;script&gt;"></textarea>
                  </div>
                </div>
              </div>

              <div class="tab-ct">
                <div class="form-item">
                  <h4 class="form-tit">
                    Css 模式
                  </h4>
                  <div class="form-ct">
                    <select name="CssPreprocessor" v-model="CssPreprocessor" class="j-insubmit">
                      <option value="1">
                        None
                      </option>
                      <option value="2">
                        Scss
                      </option>
                      <option value="3">
                        Less
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-item">
                  <h4 class="form-tit">
                    Css Base
                  </h4>
                  <div class="form-ct">

                    <div>
                      <label>
                        <input type="radio" checked="checked" name="cssbase" value="1"  v-model="CssBase"/> None
                      </label>
                      <label>
                        <input type="radio" name="cssbase" value="2"  v-model="CssBase"/> normalize.css
                      </label>
                      <label>
                        <input type="radio" name="cssbase" value="3"  v-model="CssBase"/> reset.css
                      </label>

                    </div>

                  </div>
                </div>

                <div class="form-item">
                  <h4 class="form-tit">
                    Css 引用
                  </h4>
                  <div class="form-ct">
                    <textarea name="CssExternal" v-model="CssExternal" placeholder="&lt;link&gt;" class="j-insubmit">
                    </textarea>
                  </div>
                  <h4 class="form-tit">
                    快速添加
                  </h4>
                  <div class="form-c cf quick-add-box">
                    <select id="css-quick-add" class="quick-add-select" v-on:change="quickAdd">
                      <option value="none">---</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/css/bootstrap.min.css">Bootstrap</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.0/css/foundation.min.css">Foundation</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">Animate.css</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="tab-ct">
                <div class="form-item">
                  <h4 class="form-tit">
                    Javascript 模式
                  </h4>
                  <div class="form-ct">
                    <select name="JsPreprocessor" v-model="JsPreprocessor" class="j-insubmit">
                      <option value="1">
                        None
                      </option>
                    </select>
                  </div>
                </div>
                
                <div class="form-item">
                  <h4 class="form-tit">
                    Javascript 引用
                  </h4>
                  <div class="form-ct">
                    <textarea name="JsExternal" v-model="JsExternal"   placeholder="&lt;script&gt;" class="j-insubmit">
                    </textarea>
                  </div>
                  <h4 class="form-tit">
                    快速添加
                  </h4>
                  <div class="form-c cf quick-add-box">
                    <select id="js-quick-add" class="quick-add-select" v-on:change="quickAdd">
                      <option value="none">---</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular.min.js">Angular</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js">Backbone</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/js/bootstrap.min.js">Bootstrap</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/d3/4.5.0/d3.min.js">D3</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/ember.js/2.11.0/ember.min.js">Ember</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/TweenMax.min.js">GreenSock TweenMax</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.6/handlebars.min.js">Handlebars</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js">jQuery</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js">jQuery UI</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js">Lodash</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js">Modernizr</option>
                      <option value="https://cdn.polyfill.io/v2/polyfill.min.js">Polyfill.io</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/polymer/0.5.6/polymer.min.js">Polymer</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react.min.js">React</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-dom.min.js">React DOM</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.4.1/snap.svg-min.js">Snap.svg</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/three.js/84/three.min.js">Three.js</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js">Underscore</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.10/vue.min.js">Vue</option>
                      <option value="https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js">Zepto</option>
                      <option value="https://cdn.zingchart.com/zingchart.min.js">ZingChart</option>
                    </select>
                  </div>

                  <div class="form-c cf quick-select">
                    <a data-src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" v-on:click="quickAdd2" href="javascript:;">
                      jQuery
                    </a>
                  </div>
                </div>

              </div>

          
            </div>
          </form>

        </div>



      </div>


    </div>

    
  </div>

</template>




<script>

  export default from "./js/penSettingDialog";

</script>