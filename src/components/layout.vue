<template>

  <div class="editor-box">


    <template v-if="layoutType==='ly1'">
      <div class="web-editor web-editor1" data-type="editor1">

        <div class="boxes boxes-row boxes-row-2" id="boxes-row">
          <div class="box box-row box-code">
            <div class="boxes boxes-col boxes-col-3" id="boxes-col">
              
              <div class="box box-col">
                <div class="box-menu">
                  <div class="editor-actions">
                    <button class="button setting-nub" data-type="html">
                    </button>
                    <h2 class="box-title">
                      HTML
                    </h2>

                  </div>
                </div>
                <div class="vs-editor j_rp" data-type="html">

                </div>
                <div class="resizer resizer-col"></div>
              </div>

              <div class="box box-col">
                <div class="box-menu">
                  <div class="editor-actions">
                    <button class="button setting-nub" data-type="css">

                    </button>
                    <h2 class="box-title">
                      CSS
                    </h2>

                  </div>
                </div>
                <div class="vs-editor j_rp" data-type="css">

                </div>
                <div class="resizer resizer-col"></div>
              </div>

              <div class="box box-col">
                <div class="box-menu">
                  <div class="editor-actions">
                    <button class="button setting-nub" data-type="js">

                    </button>
                    <h2 class="box-title">
                      JS
                    </h2>

                  </div>
                </div>
                <div class="vs-editor j_rp" data-type="javascript">

                </div>
              </div>

            </div>

          <div class="resizer resizer-row  resizer-bt"></div>
          </div>


          <div class="box box-row box-result" id="box-result">

            <div class="drag-cover" id="drag-cover"></div>
            <div class="result-container j_rp" id="result-container">

            </div>


          </div>


        </div>

      </div>
    </template>


    <template v-else-if="layoutType=='ly3'">

      <div class="web-editor web-editor3" data-type="editor3">
        <div class="tab">

          <div class="tab-menus cf" id="tabMenus">
            <div class="tab-menu active">
              HTML
            </div>
            <div class="tab-menu">
              CSS
            </div>
            <div class="tab-menu">
              JS
            </div>
            <div class="tab-menu">
              Result
            </div>

            <div class="editor-actions">
              <button class="button setting-nub" data-type="tab" >

              </button>
            </div>

          </div>

          <div class="tab-cts" id="tabCts">
            <div class="tab-ct active">
              <div class="vs-editor j_rp" data-type="html">

              </div>
            </div>
            <div class="tab-ct">
              <div class="vs-editor j_rp" data-type="css">

              </div>
            </div>
            <div class="tab-ct">
              <div class="vs-editor j_rp" data-type="javascript">

              </div>
            </div>


            <div class="tab-ct">
              <div class="box-result" id="box-result">
                <div class="drag-cover" id="drag-cover"></div>
                <div class="result-container j_rp" id="result-container">

                </div>

              </div>


            </div>
          </div>

        </div>



      </div>

    </template>

    <template v-else-if="layoutType=='ly4'">
      <div class="web-editor web-editor4" data-type="editor4">

        <div class="boxes boxes-row boxes-row-2">


          <div class="box box-code">


            <div class="tab">

              <div class="tab-menus cf" id="tabMenus">
                <div class="tab-menu active">
                  HTML
                </div>
                <div class="tab-menu">
                  CSS
                </div>
                <div class="tab-menu">
                  JS
                </div>

                <div class="editor-actions">
                  <button class="button setting-nub" data-type="tab">

                  </button>
                </div>

              </div>

              <div class="tab-cts" id="tabCts">
                <div class="tab-ct active">
                  <div class="vs-editor j_rp" data-type="html">

                  </div>
                </div>
                <div class="tab-ct">
                  <div class="vs-editor j_rp" data-type="css">

                  </div>
                </div>
                <div class="tab-ct">
                  <div class="vs-editor j_rp" data-type="javascript">

                  </div>
                </div>
              </div>

            </div>

            <div class="resizer"></div>
          </div>


          <div class="box box-result" id="box-result">
            <div class="drag-cover" id="drag-cover"></div>
            <div class="result-container j_rp" id="result-container">

            </div>

          </div>


        </div>



      </div>

    </template>

    <template v-else-if="layoutType=='ly5'">

      <div class="web-editor web-editor5" data-type="editor5">

        <div class="boxes boxes-col boxes-col-2">

          <div class="box box-result" id="box-result">
            <div class="box-menu">
              Result
            </div>
            <div class="drag-cover" id="drag-cover"></div>
            <div class="result-container j_rp" id="result-container">

            </div>

            <div class="resizer resizer-col"></div>
          </div>

          <div class="box box-code">


            <div class="tab">

              <div class="tab-menus cf" id="tabMenus">
                <div class="tab-menu active">
                  HTML
                </div>
                <div class="tab-menu">
                  CSS
                </div>
                <div class="tab-menu">
                  JS
                </div>
                <div class="editor-actions">
                  <button class="button setting-nub" data-type="tab" >
                  </button>
                </div>

              </div>

              <div class="tab-cts" id="tabCts">
                <div class="tab-ct active">
                  <div class="vs-editor j_rp" data-type="html">

                  </div>
                </div>
                <div class="tab-ct">
                  <div class="vs-editor j_rp" data-type="css">

                  </div>
                </div>
                <div class="tab-ct">
                  <div class="vs-editor j_rp" data-type="javascript">

                  </div>
                </div>
              </div>

            </div>


          </div>

        </div>
      </div>

    </template>

    <template v-else-if="layoutType=='ly7'">

      <div class="web-editor web-editor7" data-type="editor7">

        <div class="boxes boxes-col boxes-col-2" id="boxes-col">

          <div class="box box-col box-result" id="box-result">
            <div class="box-menu">
              Result
            </div>
            <div class="drag-cover" id="drag-cover"></div>
            <div class="result-container j_rp" id="result-container">

            </div>

            <div class="resizer  resizer-col"></div>
          </div>

          <div class="box box-col box-code">
            <div class="boxes boxes-row boxes-row-3" id="boxes-row">
              <div class="box box-row box-css">
                <div class="box-menu">
                  <div class="editor-actions">
                    <button class="button setting-nub" data-type="html">

                    </button>
                    <h2 class="box-title">
                      HTML
                    </h2>

                  </div>
                </div>
                <div class="vs-editor j_rp" data-type="html">
                </div>
              </div>
              <div class="box box-row box-css">
                <div class="resizer resizer-row ">
                  <div class="resizer-line"></div>
                  <div class="box-menu">
                    <div class="editor-actions">
                      <button class="button setting-nub" data-type="css">

                      </button>
                      <h2 class="box-title">
                        CSS
                      </h2>

                    </div>
                  </div>
                </div>
                <div class="vs-editor j_rp" data-type="css">
                </div>
              </div>
              <div class="box box-row box-js">
                <div class="resizer resizer-row">
                  <div class="resizer-line"></div>
                  <div class="box-menu">
                    <div class="editor-actions">
                      <button class="button setting-nub" data-type="js">

                      </button>
                      <h2 class="box-title">
                        JS
                      </h2>

                    </div>
                  </div>
                </div>

                <div class="vs-editor j_rp" data-type="javascript">

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </template>

    <template v-else-if="layoutType=='ly8'">
      <div class="web-editor web-editor8" data-type="editor8">
        <div class="boxes boxes-col boxes-col-2" id="boxes-col">
          <div class="box box-col box-code">
            <div class="boxes boxes-row boxes-row-3" id="boxes-row">

              <div class="box box-row">
                <div class="box-menu">
                  <div class="editor-actions">
                    <button class="button setting-nub" data-type="html">
                    </button>
                    <h2 class="box-title">
                      HTML
                    </h2>

                  </div>
                </div>
                <div class="vs-editor j_rp" data-type="html">
                </div>

              </div>

              <div class="box box-row">
                <div class="resizer resizer-row ">
                  <div class="resizer-line"></div>
                  <div class="box-menu">
                    <div class="editor-actions">
                      <button class="button setting-nub" data-type="css">
                      </button>
                      <h2 class="box-title">
                        CSS
                      </h2>

                    </div>
                  </div>
                </div>

                <div class="vs-editor j_rp" data-type="css">
                </div>
             

              </div>

              <div class="box box-row ">
                <div class="resizer resizer-row">
                  <div class="resizer-line"></div>
                  <div class="box-menu">
                    <div class="editor-actions">
                      <button class="button setting-nub" data-type="js">
                      </button>
                      <h2 class="box-title">
                        JS
                      </h2>
                    </div>
                  </div>
                </div>

                <div class="vs-editor j_rp" data-type="javascript">
                </div>
              </div>

            </div>
            <div class="resizer  resizer-col"></div>
          </div>
          <div class="box box-col box-result" id="box-result">
            <div class="box-menu">Result</div>
            <div class="drag-cover" id="drag-cover"></div>
            <div class="result-container j_rp" id="result-container">
            </div>
          </div>

        </div>

      </div>

    </template>


  </div>

</template>




<script>

  export default from "./js/layout";
</script>