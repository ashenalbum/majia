<template>
    <div class="cont">
        <div class="title df df-r ai-c just-c-bet">
            <div class="df df-r ai-c">
                <span class="txt fs_32 c_33">分销功能</span>
                <van-icon name="question-o" color="#BBC1D4" size="0.3rem" class="i" @click="showTishi=true"/>
            </div>
            <van-button icon="plus" size="small" color="#FF9B00" @click="showForm2=true"></van-button>
        </div>
        <div class="formbox">
            <div class="form mt-20">
                <van-field label="分销层级" readonly value="1" type="number" input-align="right" class="pl-4" />
                <van-field label="分成方式" readonly placeholder="请选择分成方式" right-icon="arrow"  input-align="right" class="pl-4" />
                <van-field label="分销奖励" type="number" placeholder="请输入奖励" input-align="right" class="pl-4" />
            </div>
        </div>
        <div v-if="showForm2" class="formbox">
            <div class="mt-20 txt-r">
                <van-icon @click="showForm2=false" name="delete" size="0.5rem" color="#999999" />
            </div>
            <div class="form mt-10">
                <van-field label="分销层级" readonly value="2" type="number" input-align="right" class="pl-4" />
                <van-field label="分成方式" readonly placeholder="请选择分成方式" right-icon="arrow"  input-align="right" class="pl-4" />
                <van-field label="分销奖励" type="number" placeholder="请输入奖励" input-align="right" class="pl-4" />
            </div>
        </div>
        
        <van-field label="分销按钮文案" placeholder="请输入，如:生成海报" input-align="right" class="mt-20 pl-4" />
        <van-cell title="开启分销" class="cell pl-4 pr-4">
            <van-switch v-model="onswitch" size="0.4rem" />
        </van-cell>

        <van-button class="submit" type="info">确认发布</van-button>

        <van-overlay :show="showTishi">
            <div class="wrapper df df-c ai-c just-c-ct" @click="showTishi=false">
                <div class="tishi shadow" @click.stop>
                    <div class="title df df-r ai-c">
                        <van-icon name="question-o" size="0.32rem" color="#FF9C00" />
                        <div>
                            <span class="fs_26 c_33 title-txt">功能说明</span>
                        </div>
                    </div>
                    <div class="tishi-body fs_24 c_ashen">
                        <div class="t-indent">分销说明分销说明，分销说明分销说明分销说明，分销说明分销说明分销说明分销说明 1049</div>
                    </div>
                </div>
                <van-icon name="close" class="mt-30" size="0.6rem" color="#BFC4CE" />
            </div>
        </van-overlay>
    </div>
</template>
<script>
export default {
    data(){
        return {
            showForm2: false,
            onswitch: true,
            showTishi: false,
        }
    },
    methods: {

    }
}
</script>
<style scoped>
.cont{width:6.4rem; margin:0 auto;}

.title{padding-top:0.4rem;}
.title .txt{line-height:1;}
.title .i{padding-left:0.2rem;}
.form,
.form-input{border-bottom:1px solid #999999;}
.pl-4{padding-left:4px;}
.cell .van-cell__value{line-height:1;}
.submit{border-radius:0.1rem; width:100%; margin:0.6rem 0 0.4rem;}

.wrapper {display: flex; left:0; top:0; width:100%; height: 100%; z-index:99;}
.wrapper .tishi{box-sizing:border-box; width:6.9rem; padding:0.5rem 0.5rem 0.3rem; background:#ffffff; border-radius:0.1rem;}

.wrapper .tishi .title{padding:0; padding-bottom:0.2rem; border-bottom:1px solid #E2E6F1;}
.wrapper .tishi .title .title-txt{padding-left:0.2rem;}
.wrapper .tishi .tishi-body{padding-top:0.2rem;}
.wrapper .tishi .tishi-body .img{width:3rem; height:1.68rem; margin-right:0.2rem;}
</style>