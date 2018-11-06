<footer id="footer" role="contentinfo">
  <div class="footer-inner">
    <div class="container-normal">
      <div class="row-fluid">
        <div class="col-md-4">

          <#if footer_col_1_article_id?has_content>
            <@includeWCD group_id=group_id article_id=footer_col_1_article_id />
           <#else>
            &nbsp;
           </#if>

        </div>
        <div class="col-md-4">
          <a class="logo-vgr" href="${vgr_logo_link}">
            <img src="${images_folder}/theme/logo/vgr-logo-white.png" alt="V&auml;stra G&ouml;talandsregionen" />
          </a>
        </div>
        <div class="col-md-4">

          <#if footer_col_2_article_id?has_content>
            <@includeWCD group_id=group_id article_id=footer_col_2_article_id />
           <#else>
            &nbsp;
           </#if>

        </div>
      </div>
    </div>
  </div>
</footer>
