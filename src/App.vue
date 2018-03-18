<template>

  <div id="app">


    <div id="editor-container" class="editor-container">

      <symbol id="gear" viewBox="0 0 100 100">
        <path d="M87.687 45.077c-.313-2.433-.816-4.807-1.542-7.079l8.145-11.73-5.827-7.515-.094-.123-5.824-7.514-12.955 5.577c-2.041-1.265-4.192-2.362-6.459-3.219L59.42 0H40.586l-3.709 13.474c-2.27.857-4.421 1.955-6.463 3.222l-12.957-5.577-5.825 7.514-.097.124-5.822 7.517 8.146 11.731a39.832 39.832 0 0 0-1.544 7.079L0 52.032l2.08 9.375.033.15 2.08 9.375 14.001.761a39.157 39.157 0 0 0 4.4 5.668l-2.396 14.227 8.416 4.173.138.067L37.169 100l9.309-10.796c1.161.109 2.335.173 3.524.173s2.358-.074 3.52-.184l9.317 10.804 8.415-4.173.141-.066 8.413-4.172-2.396-14.228a39.06 39.06 0 0 0 4.4-5.672l14-.759 2.078-9.375.035-.154L100 52.025l-12.313-6.948zM50.003 34.51c8.435 0 15.272 7.035 15.272 15.719 0 8.679-6.839 15.717-15.272 15.717-8.436 0-15.272-7.038-15.272-15.717 0-8.684 6.838-15.719 15.272-15.719z"></path>
      </symbol>



      <header class="header">

        <div class="title-box">
          <div id="title-text" class="title-text">
            <input type="text" id="title-ipt" placeholder="未命名笔记" class="tit-ipt focus" style="display: block;">       
        </div>
        </div>


        <div class="action-box">

          <a href="javascript:;" v-on:click="runEditor"  class="btn">执行</a>
        
          <a href="javascript:;" v-on:click="clearPen" class="btn">
            清空
          </a>
          <a href="javascript:;" class="btn view-btn" v-on:click="showSettingBox">
            视图
          </a>
          <a href="javascript:;" v-on:click="setting" class="btn">
            设置
          </a>
          <div class="view-box" id="view-box" v-bind:class="{ active: isShowViewBox }">
            <div class="view-wrap">

              <div class="view-list">

                <div class="s-view s-view1">

                  <div class="iboxs s-rows">

                    <div class="ibox s-cols">
                      <i class="ibox s-code i-ac">

                      </i>
                      <i class="ibox s-code i-ac">
                      </i>
                      <i class="ibox s-code i-ac">

                      </i>
                    </div>

                    <div class="ibox s-result i-ac">

                    </div>
                  </div>

                </div>

                <div class="s-view s-view2" style="display:none">

                  <div class="iboxs s-rows">
                    <div class="ibox s-result i-ac">
                    </div>
                    <div class="ibox s-cols">
                      <i class="ibox s-code i-ac">
                      </i>
                      <i class="ibox s-code i-ac">
                      </i>
                      <i class="ibox s-code i-ac">
                      </i>
                    </div>


                  </div>

                </div>

                <div class="s-view s-view3">
                  <div class="iboxs s-rows">
                    <div class="ibox s-menu i-ac">
                    </div>
                    <div class="ibox s-code i-ac">
                    </div>
                  </div>
                </div>

                <div class="s-view s-view4">
                  <div class="iboxs s-rows">
                    <div class="ibox s-rows">
                      <div class="ibox s-menu i-ac">
                      </div>
                      <div class="ibox s-code i-ac">
                      </div>
                    </div>
                    <div class="ibox s-result i-ac">
                    </div>
                  </div>
                </div>

                <div class="s-view s-view5">

                  <div class="iboxs s-cols">

                    <div class="ibox s-result i-ac">

                    </div>

                    <div class="ibox s-rows">
                      <div class="ibox s-menu i-ac">

                      </div>
                      <div class="ibox s-code i-ac">

                      </div>

                    </div>

                  </div>

                </div>

                <div class="s-view s-view6" style="display:none">

                  <div class="iboxs s-cols">
                    <div class="ibox s-rows">
                      <div class="ibox s-menu i-ac">

                      </div>
                      <div class="ibox s-code i-ac">

                      </div>

                    </div>
                    <div class="ibox s-result i-ac">

                    </div>



                  </div>

                </div>

                <div class="s-view s-view7">

                  <div class="iboxs s-cols">

                    <div class="ibox s-result i-ac">

                    </div>
                    <div class="ibox s-rows">
                      <div class="ibox  s-code i-ac">

                      </div>
                      <div class="ibox s-code i-ac">

                      </div>
                      <div class="ibox s-code i-ac">

                      </div>
                    </div>


                  </div>

                </div>

                <div class="s-view s-view8">

                  <div class="iboxs s-cols">
                    <div class="ibox s-rows">
                      <div class="ibox  s-code i-ac">

                      </div>
                      <div class="ibox s-code i-ac">

                      </div>
                      <div class="ibox s-code i-ac">

                      </div>
                    </div>

                    <div class="ibox s-result i-ac">

                    </div>


                  </div>

                </div>



              </div>

            </div>
          </div>
        </div>


      </header>

      <div class="page-wrap" id="page-wrap">
        <layout></layout>
        
        <div class="bg-mask" v-on:click="hideViewBox" v-bind:class="{ show: isShowBgMask }"></div>
     
      </div>

      <div class="setting-box" id="settingBox" v-bind:class="{ show: isShowSettingBox }">

        <div class="hd">
          <h2>设置</h2>
          <a href="javascript:;" v-on:click="setttingBoxHide" class="off">
            <i class="ft-x font-medium-3"></i>
          </a>
        </div>
        <div class="bd">

          <div class="set-box">

      

            <div class="form-item">
              <h4>
                编辑器字体大小
              </h4>

              <select  v-model="fontSize" class="select-control">

                <option value="11">11px</option>
                <option value="12">12px</option>
                <option value="13">13px</option>
                <option value="14">14px</option>
                <option value="15">15px</option>
                <option value="16">16px</option>
                <option value="17">17px</option>
                <option value="18">18px</option>
                <option value="19">19px</option>
                <option value="20">20px</option>
                <option value="21">21px</option>
                <option value="22">22px</option>
                <option value="23">23px</option>
                <option value="24">24px</option>
              </select>


            </div>



            <div class="form-item">
              <h4>
                编辑器主题
              </h4>

              <div class="item-list">
                <div class="form-check-inline">
                  <div class="custom-control custom-radio">
                    <input type="radio" id="themeRadio1" checked="checked" name="themeRadio" class="custom-control-input" value="theme-gray" v-model="theme"  />
                    <label class="custom-control-label" for="themeRadio1">灰</label>
                  </div>
                </div>
                <div class="form-check-inline">
                  <div class="custom-control custom-radio">
                    <input type="radio" id="themeRadio2" name="themeRadio" class="custom-control-input" value="theme-black" v-model="theme" />
                    <label class="custom-control-label" for="themeRadio2">黑</label>
                  </div>
                </div>
                <div class="form-check-inline">
                  <div class="custom-control custom-radio">
                    <input type="radio" id="themeRadio3" name="themeRadio" class="custom-control-input" value="theme-blue" v-model="theme" />
                    <label class="custom-control-label" for="themeRadio3">深蓝</label>
                  </div>
                </div>

              </div>


            </div>




          </div>

           
          </div>

      

        </div>

  

      <div class="bg-mask" v-on:click="hideSettingBox" v-bind:class="{ show: isShowBgMask }"></div>

      <footer class="footer cf">
        <div class="version">
          版本：{{version}}
        </div>
      </footer>

      
    </div>


    <penSettingDialog></penSettingDialog>

  </div>



</template>




<script>

  import index from "./router/index";

  export default  index


</script>


