<template>
    <div class="ctx">
        <div class="ctx_title">
            {{ 'waterMelon timer'.toLocaleUpperCase() }}
        </div>
        <div class="ctx_progress">
            <el-progress type="circle" :stroke-width="8" :percentage="percentage"
                :status="currentTimer.isPaulse ? 'exception' : ''">
                <template #default="{ percentage }">
                    <img src="../../assets/images/watermelon.png" alt="watermelon" v-if="!currentTimer.isPaulse" />
                    <img src="../../assets/images/watermelon-all.png" alt="watermelon" v-else />
                    <div class="ctx_progress_text">
                        <span v-if="`${currentTimer.time / 60 % 60}`.length === 1">0</span>
                        <span>{{ parseInt(`${currentTimer.time / 60 % 60}`) }}</span>
                        <span>:</span>
                        <span v-if="`${currentTimer.time % 60}`.length === 1">0</span>
                        <span>{{ parseInt(`${currentTimer.time % 60}`) }}</span>
                    </div>
                </template>
            </el-progress>
        </div>
        <div class="ctx_des">开始学习！</div>
        <div class="ctx_button">
            <el-button :icon="Watermelon" circle @click="play" />
            <el-popconfirm title="你要重新开始？" confirm-button-text="是" cancel-button-text="不了" confirm-button-type="danger"
                cancel-button-type="primary" width="220" @confirm="refresh">
                <template #reference>
                    <el-button :icon="Refresh" circle :disabled="!currentTimer.isPaulse" />
                </template>
            </el-popconfirm>
            <el-button :icon="Setting" circle />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Watermelon, Refresh, Setting } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import type { timer } from '@/types/timer'

let interval: any = null
const percentage = ref(0)
const currentTimer = reactive<timer>({
    isPlay: false,
    isPaulse: false,
    defaultVal: 25 * 60,
    settingVal: 25 * 60,
    time: 0,
    paulseTime: 5 * 60
})

function play() {
    if (currentTimer.isPlay) {
        currentTimer.isPaulse = !currentTimer.isPaulse
        if (currentTimer.isPaulse) {
            clearInterval(interval)
        } else {
            intervalCount()
        }
    } else {
        currentTimer.isPlay = !currentTimer.isPlay
        currentTimer.time = currentTimer.settingVal
        percentage.value = 100
        intervalCount()
    }
}

function refresh() {
    currentTimer.time = 0
    currentTimer.isPlay = false
    currentTimer.isPaulse = false
    clearInterval(interval)
    percentage.value = 0
}

function intervalCount() {
    interval = setInterval(() => {
        currentTimer.time -= 1
        percentage.value = Number(((currentTimer.time / currentTimer.settingVal) * 100).toFixed(2))
        if (currentTimer.time <= 0) clearInterval(interval)
    }, 1 * 1000)
}
</script>

<style lang="scss" scoped>
.ctx {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url(../../assets/images/bgi.webp);

    @font-face {
        font-family: SedgwickAveDisplay-Regular;
        src: url(../../assets/fonts/SedgwickAveDisplay-Regular.ttf);
    }

    @font-face {
        font-family: ZCOOLKuaiLe-Regular;
        src: url(../../assets/fonts/ZCOOLKuaiLe-Regular.ttf);
    }

    &_title {
        margin-top: 10vh;
        font-size: 2.7rem;
        letter-spacing: 5px;
        font-family: SedgwickAveDisplay-Regular, 'PingFang SC', 'Microsoft Yahei';
    }

    &_progress {
        margin-top: 5vh;

        img {
            width: 80px;
            height: 80px;
        }

        &_text {
            margin-top: 20px;
        }

        :deep(.el-progress-circle) {
            width: 200px !important;
            height: 200px !important;
        }
    }

    &_des {
        margin-top: 5vh;
        font-size: 2rem;
        font-family: ZCOOLKuaiLe-Regular, 'PingFang SC', 'Microsoft Yahei';
    }

    &_button {
        margin-top: 4vh;
        display: flex;
        justify-content: space-evenly;
        width: 250px;
        font-size: 1.5rem;

        button {
            width: 45px;
            height: 45px;
            font-size: 1.1rem;
        }
    }

    @media (max-width:800px) {
        &_title {
            margin-top: 10vh;
            font-size: 1.5rem;
            letter-spacing: 5px;
            font-family: SedgwickAveDisplay-Regular, 'PingFang SC', 'Microsoft Yahei';
        }

        &_button {
            margin-top: 7vh;
            display: flex;
            justify-content: space-evenly;
            width: 300px;
            font-size: 2.5rem;

            button {
                width: 50px;
                height: 50px;
                font-size: 1.8rem;
            }
        }
    }
}
</style>
