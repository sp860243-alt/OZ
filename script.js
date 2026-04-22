document.addEventListener('DOMContentLoaded', () => {
    const checklistItems = document.querySelectorAll('.checklist-item');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const selectedTitle = document.getElementById('selected-title');
    const selectedDescription = document.getElementById('selected-description');
    const selectedStatus = document.getElementById('selected-status');
    const visualContent = document.getElementById('visual-content');

    // 학습 항목 데이터
    const learningContent = {
        '1': {
            title: 'AI 기본 개념 이해',
            description: '인공지능(AI), 머신러닝(ML), 딥러닝(DL)의 차이점을 배우고 AI가 현대 사회에 미치는 영향력을 이해합니다. 튜링 테스트부터 생성형 AI까지의 역사를 훑어봅니다.',
            img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632&auto=format&fit=crop'
        },
        '2': {
            title: '파이썬 기초 문법',
            description: 'AI 개발의 표준 언어인 파이썬의 기초를 마스터합니다. 변수, 자료구조(리스트, 딕셔너리), 조건문, 반복문 등 프로젝트 수행에 필수적인 문법을 익힙니다.',
            img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1469&auto=format&fit=crop'
        },
        '3': {
            title: '데이터 분석 입문 (Pandas)',
            description: '데이터는 AI의 연료입니다. Pandas와 NumPy 라이브러리를 사용해 데이터를 정제하고, 시각화하며, 의미 있는 통찰을 도출하는 기법을 실무 위주로 학습합니다.',
            img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop'
        },
        '4': {
            title: '머신러닝 알고리즘 개요',
            description: '선형 회귀, 분류, 군집화 등 전통적인 머신러닝 알고리즘의 원리를 이해합니다. Scikit-learn을 활용해 실제 모델을 학습시키고 성능을 평가해 봅니다.',
            img: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1470&auto=format&fit=crop'
        },
        '5': {
            title: '딥러닝 및 신경망 기초',
            description: '인간의 뇌 구조를 모방한 인공신경망의 원리를 배웁니다. 퍼셉트론, 역전파, 활성화 함수의 개념을 익히고 TensorFlow나 PyTorch의 기본 구조를 이해합니다.',
            img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1470&auto=format&fit=crop'
        },
        '6': {
            title: 'LLM 및 프롬프트 엔지니어링',
            description: 'ChatGPT와 같은 대규모 언어 모델(LLM)의 작동 원리를 배우고, 최적의 답을 얻어내기 위한 프롬프트 설계 기법을 실습합니다. API 활용법과 AI 윤리도 다룹니다.',
            img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1470&auto=format&fit=crop'
        }
    };

    // 진척도 업데이트 함수
    const updateProgress = () => {
        const total = checkboxes.length;
        const checked = document.querySelectorAll('input[type="checkbox"]:checked').length;
        const percentage = Math.round((checked / total) * 100);
        
        progressBar.style.width = `${percentage}%`;
        progressText.innerText = `${percentage}% 완료`;
    };

    // 항목 클릭 시 콘텐츠 변경
    checklistItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // 체크박스 클릭 시에는 동작하지 않게 예외 처리
            if (e.target.tagName === 'INPUT' || e.target.className === 'checkmark') return;

            const id = item.getAttribute('data-id');
            const content = learningContent[id];

            // UI 업데이트
            checklistItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            selectedTitle.innerText = content.title;
            selectedDescription.innerText = content.description;
            visualContent.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${content.img}')`;
            
            const checkbox = item.querySelector('input');
            selectedStatus.innerText = checkbox.checked ? '학습 완료' : '진행 중';
            selectedStatus.style.background = checkbox.checked ? 'rgba(52, 211, 153, 0.15)' : 'rgba(56, 189, 248, 0.15)';
            selectedStatus.style.color = checkbox.checked ? '#34d399' : '#38bdf8';
            selectedStatus.style.borderColor = checkbox.checked ? 'rgba(52, 211, 153, 0.3)' : 'rgba(56, 189, 248, 0.3)';
        });
    });

    // 체크박스 변경 시 진척도 업데이트
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateProgress();
            
            // 현재 선택된 항목의 상태 배지도 함께 업데이트
            const item = checkbox.closest('.checklist-item');
            if (item.classList.contains('active')) {
                selectedStatus.innerText = checkbox.checked ? '학습 완료' : '진행 중';
                selectedStatus.style.background = checkbox.checked ? 'rgba(52, 211, 153, 0.15)' : 'rgba(56, 189, 248, 0.15)';
                selectedStatus.style.color = checkbox.checked ? '#34d399' : '#38bdf8';
                selectedStatus.style.borderColor = checkbox.checked ? 'rgba(52, 211, 153, 0.3)' : 'rgba(56, 189, 248, 0.3)';
            }
        });
    });

    // 초기 실행
    updateProgress();
});
