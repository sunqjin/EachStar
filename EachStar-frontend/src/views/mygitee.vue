<template>
  <div class="mygitee" v-loading="loading">
    <!-- 侧栏视图 -->
    <el-affix class="aside-menu" :offset="100">
      <aside-menu />
    </el-affix>

    <!-- 卡片视图 -->
    <div class="card-view">
      <!-- 卡片列表 -->
      <div class="card-container">
        <!-- 遍历card -->
        <el-card v-for="item of currentPageData" :key="item" class="card-list">
          <div class="card-block">
            <div class="card-titleblock">
              <a class="card-title" :href="item.title" target="_blank">{{
                item.title
              }}</a>
              <span class="card-time">{{ item.createdAt }}</span>
            </div>
            <div class="card-discription">
              {{ item.context }}
            </div>
            <div class="card-valueblock">
              <span class="card-rank">
                <span>
                  <svg
                    class="fronticon"
                    style="
                      width: 19px;
                      height: 19px;
                      color: #c45656;
                      margin-bottom: 0.4%;
                    "
                    aria-hidden="true"
                  >
                    <use xlink:href="#icon-yunpan"></use>
                  </svg>
                  云币价值: {{ item.starPrice }}</span
                >
                <el-divider direction="vertical" />
                <span style="color: #409eff"
                  ><svg
                    class="fronticon"
                    style="width: 23px; height: 23px; vertical-align: -0.42em"
                    aria-hidden="true"
                  >
                    <use xlink:href="#icon-cishu"></use></svg
                  >剩余悬赏次数: {{ item.starNum }}</span
                >
              </span>
              <el-button
                id="card-button"
                @click="deleteButton(item)"
                type="danger"
                plain
                ><svg class="fronticon" aria-hidden="true">
                  <use xlink:href="#icon-lajitong"></use>
                </svg>
                删除</el-button
              >
            </div>
          </div>
        </el-card>

        <empty-card v-show="pageIsEmpty" />
      </div>

      <!-- 卡片换页 -->
      <el-pagination
        id="pagination"
        layout="prev, pager, next"
        @current-change="pageChange"
        :total="totalPage * 10"
      />

      <div class="footer">
        <bottom-line />
      </div>
    </div>
  </div>
  <GiteeDelete ref="Delete" />
</template>

<script>
import bus from "../utils/emitter";
import GiteeDelete from "../components/dialog/giteeDelete.vue";
import BottomLine from "../components/bottomLine.vue";
import AsideMenu from "../components/asideMenu.vue";
import "../iconfont/iconfont";
import { getMyPageData } from "../api/getMyPageData.js";
import EmptyCard from "../components/emptyCard.vue";

export default {
  name: "mygitee",
  data() {
    return {
      loading: true,
      pageIsEmpty: false,

      totalPage: 0,
      currentPage: 1,
      currentPageData: [],
    };
  },
  mounted() {
    this.refreshPageData();
    bus.on("refreshPageData", this.refreshPageData);
    bus.emit("refreshUserInfo", "Gitee");
  },
  methods: {
    /**
     * 删除按钮
     */
    deleteButton(card) {
      this.$.refs.Delete.openPage(card);
    },

    /**
     * 切换页面
     */
    async pageChange(page) {
      this.currentPage = page;
      this.loading = true;

      var src = await getMyPageData("Gitee", this.currentPage);
      this.currentPageData = src.data;
      this.totalPage = Math.ceil(src.count / 10);
      this.pageIsEmpty = this.currentPageData.length == 0;
      this.loading = false;
      bus.emit("scrollToTop");
    },

    /**
     * 刷新页面(到第一页)
     */
    refreshPageData: function () {
      this.pageChange(1);
    },
  },
  components: {
    GiteeDelete,
    AsideMenu,
    BottomLine,
    EmptyCard,
  },
};
</script>

<style lang="scss" scoped>
.aside-menu {
  width: 0.001px !important;
}
.fronticon {
  width: 25px;
  height: 25px;
  vertical-align: -0.45em;
  fill: currentColor;
  overflow: hidden;
  margin-bottom: auto;
}

.mygitee {
  display: flex;
  flex: 1;
}

.card-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 960px;
  .card-list {
    box-shadow: var(--el-box-shadow);
    border-radius: 15px;
    width: 50%;
    margin-left: 25%;
    margin-right: 25%;
    margin-bottom: max(1%, 15px);
    min-width: 600px;
  }
  #pagination {
    margin: 3% 0% 3% 0%;
    justify-content: center;
  }
}

.card-container {
  flex-grow: 1;
  .card-block {
    .card-titleblock {
      margin-bottom: 2%;
      width: 100%;
      display: flex;
      .card-title {
        color: #e4e7ed;
        width: 70%;
        text-align: left;
        font-size: large;
        font-weight: bold;
        text-decoration: none;
      }

      .card-time {
        color: #a8abb2;
        width: 30%;
        text-align: right;
      }
    }

    .card-discription {
      color: #909399;
      text-align: left;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      letter-spacing: 0;
      text-overflow: ellipsis;
      width: 90%;
      margin: 0% 3% 3% 3%;
    }

    .card-valueblock {
      width: 100%;
      display: flex;

      .card-rank {
        color: #b88230;
        background-color: none;
        width: 80%;
        margin: auto 3% auto 3%;
        text-align: left;
      }

      #card-button {
        color: #e4e7ed;
        font-size: large;
        width: 30%;
      }
    }
  }
}
</style>
