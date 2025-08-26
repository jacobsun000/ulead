import PageBackground from "@/ui/zh/PageBackground";
import Footer from "@/ui/zh/Footer";

export default function LeadProgramPage() {
  return (
    <PageBackground page="lead-program">
      {/* ===== Hero ===== */}
      <div className="w-full px-0 pt-[96px] lg:pt-[128px]">
        <header className="text-center text-white">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">合领领航计划</h1>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              className="rounded-full px-5 py-2 text-sm sm:text-base bg-white/90 text-primary shadow hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              美国大学领航计划
            </button>
            <button
              type="button"
              className="rounded-full px-5 py-2 text-sm sm:text-base bg-white/20 text-white ring-1 ring-white/50 hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              美国高中领航计划
            </button>
          </div>

          <div className="mt-8 flex justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="opacity-90">
              <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </header>

        {/* ===== 主体容器 ===== */}
        <main className="w-full mt-10 bg-white p-6 sm:p-10 shadow-xl ring-1 ring-black/5">

          {/* ===== 美国高中领航计划 ===== */}
          <section id="section-highschool-plan">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">美国高中领航计划</h2>
              <p className="mt-4 text-gray-600">
                专注孩子本身，由成长顾问同导师引领孩子和家长进行个性化的成长和申请规划，
                让孩子有足够的时间有效地提升自己的背景和能力
              </p>
            </div>

            {/* 卡片 */}
            <div className="mx-auto mt-10 max-w-6xl">
              <div className="grid gap-6 sm:grid-cols-2">
                <img src="/img/lead-program/a.svg" alt="规划整体解决方案" className="w-90 h-auto mx-auto" />
                <img src="/img/lead-program/b.svg" alt="暑假机会拓展" className="w-90 h-auto mx-auto" />
                <img src="/img/lead-program/c.svg" alt="英文/文件读计划" className="w-90 h-auto mx-auto" />
                <img src="/img/lead-program/d.svg" alt="SSAT/托福学习计划" className="w-90 h-auto mx-auto" />
                <img src="/img/lead-program/e.svg" alt="顾校育导师制" className="w-90 h-auto mx-auto" />
                <img src="/img/lead-program/f.svg" alt="校园调研/访校" className="w-90 h-auto mx-auto" />
                <img src="/img/lead-program/g.svg" alt="学术竞赛与申请作品规划" className="w-90 h-auto mx-auto" />
                <img src="/img/lead-program/h.svg" alt="校内GPA提升" className="w-90 h-auto mx-auto" />
              </div>
            </div>
          </section>

          {/* ===== 高中领航服务 ===== */}
          <section id="section-service" className="mx-auto mt-16 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-10">高中领航服务</h2>
            <div className="flex justify-center">
              <img
                src="/img/lead-program/service.svg"
                alt="高中领航服务流程"
                className="w-full max-w-4xl h-auto"
              />
            </div>
          </section>

          {/* ===== 八项核心竞争力 ===== */}
          <section id="section-core" className="mx-auto mt-16">
            <h2 className="text-center text-2xl md:text-3xl font-bold">八项核心竞争力</h2>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 relative mt-20 ml-20 mr-20">
              <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gray-200" aria-hidden />

              {/* 左列 */}
              <div className="space-y-6">
                {/* 1 */}
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <img src="/img/lead-program/11.svg" alt="学术成长计划" className="w-8 h-8" />
                      <span className="pl-2 font-semibold">学术成长计划</span>
                    </div>
                    <span className="text-primary text-xl leading-none select-none">－</span>
                  </div>
                  <ul className="mt-2 text-gray-600 list-disc pl-6 space-y-1">
                    <li>根据学生特点制定发展计划，学术标靶打通及发展逻辑梳理。</li>
                    <li>英语学习节点和方法，其他学科国际接轨的学习节奏和方法。</li>
                    <li>国内外教育体系的比较与选择。</li>
                    <li>美国私立/公立体系的分析和选择。</li>
                  </ul>
                </div>

                {/* 2 */}
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <img src="/img/lead-program/33.svg" alt="Sports Growth Plan" className="w-8 h-8" />
                      <span className="pl-2 font-semibold">Sports Growth Plan</span>
                    </div>
                    <span className="text-primary text-xl leading-none select-none">＋</span>
                  </div>
                </div>

                {/* 3 */}
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <img src="/img/lead-program/55.svg" alt="领导力成长计划" className="w-8 h-8" />
                      <span className="pl-2 font-semibold">领导力成长计划</span>
                    </div>
                    <span className="text-primary text-xl leading-none select-none">＋</span>
                  </div>
                </div>

                {/* 4 */}
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <img src="/img/lead-program/77.svg" alt="海外成长计划" className="w-8 h-8" />
                      <span className="pl-2 font-semibold">海外成长计划</span>
                    </div>
                    <span className="text-primary text-xl leading-none select-none">＋</span>
                  </div>
                </div>
              </div>

              {/* 右列 */}
              <div className="space-y-6">
                {/* 1 */}
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <img src="/img/lead-program/22.svg" alt="艺术成长计划" className="w-8 h-8" />
                      <span className="pl-2 font-semibold">艺术成长计划</span>
                    </div>
                    <span className="text-primary text-xl leading-none select-none">－</span>
                  </div>
                  <ul className="mt-2 text-gray-600 list-disc pl-6 space-y-1">
                    <li>启发孩子对艺术发展的认知，优势与劣势分析。</li>
                    <li>国际化视角与审美力的建立与增长。</li>
                    <li>艺术/设计类院校的学习节点、方法与资源。</li>
                    <li>个性化艺术的国际化发展路径。</li>
                  </ul>
                </div>

                {/* 2 */}
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <img src="/img/lead-program/44.svg" alt="家长教育成长计划" className="w-8 h-8" />
                      <span className="pl-2 font-semibold">家长教育成长计划</span>
                    </div>
                    <span className="text-primary text-xl leading-none select-none">＋</span>
                  </div>
                </div>

                {/* 3 */}
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <img src="/img/lead-program/66.svg" alt="节假日成长计划" className="w-8 h-8" />
                      <span className="pl-2 font-semibold">节假日成长计划</span>
                    </div>
                    <span className="text-primary text-xl leading-none select-none">＋</span>
                  </div>
                </div>

                {/* 4 */}
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <img src="/img/lead-program/88.svg" alt="公益活动成长计划" className="w-8 h-8" />
                      <span className="pl-2 font-semibold">公益活动成长计划</span>
                    </div>
                    <span className="text-primary text-xl leading-none select-none">＋</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== 能力训练 ===== */}
          <section id="section-abilities" className="mx-auto mt-16 py-6 px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold my-4">能力训练</h2>

            <div className="flex flex-wrap justify-center gap-3 mb-6 mt-16">
              {[
                "竞赛资源",
                "压力写作",
                "课外活动",
                "家庭引导",
                "英语学术写作",
                "音乐创作",
                "创意写作",
                "艺术作品集",
                "美国教授课程",
                "国际大师课",
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-700 border-2 border-transparent"
                  style={{ borderImage: "linear-gradient(90deg, #6A5AE0, #1F8CEC) 1" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mb-6">
              <span className="inline-block px-6 py-2 rounded-full text-white text-sm md:text-base font-semibold bg-gradient-to-r from-[#6A5AE0] to-[#1F8CEC] shadow">
                领航计划学生成长
              </span>
            </div>

            {/* 下方标签组 */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "创意写作",
                "运动活动",
                "英语阅读",
                "GPA 管理",
                "学术指导",
                "夏校申请",
                "科学创新",
                "音乐创作",
                "假日活动",
                "考试辅导",
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-700 border-2 border-transparent"
                  style={{ borderImage: "linear-gradient(90deg, #6A5AE0, #1F8CEC) 1" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* ===== Footer ===== */}
      <Footer />
    </PageBackground>
  );
}
