from __future__ import annotations

from pathlib import Path

from flask import Flask, jsonify

BASE_DIR = Path(__file__).resolve().parent

app = Flask(
    __name__,
    static_folder=str(BASE_DIR),
    static_url_path="",
)

STARTUP_CONTENT = {
    "title": "Що таке StartUp",
    "definition": "StartUp — це інноваційна компанія, яка перебуває на початковому етапі розвитку.",
    "mission": (
        "Її мета — створити новий продукт або технологію, що вирішує актуальну проблему ринку, "
        "та швидко масштабуватися."
    ),
    "financeBlock": {
        "title": "Чому це цікаво фінансистам",
        "description": (
            "Стартапи — це середовище швидких рішень, інвестицій і гнучких бізнес-моделей. "
            "Тут спеціалісти з фінансів отримують можливість працювати не лише з цифрами, "
            "а й впливати на стратегічні рішення компанії."
        ),
    },
    "roleBlock": {
        "title": "Роль фінансової команди",
        "description": (
            "Фінансисти, бухгалтери й економісти формують основу стабільності: планують бюджет, "
            "прогнозують прибутки, контролюють витрати та допомагають залучати інвестиції — "
            "тобто перетворюють ідею на стійкий бізнес."
        ),
    },
}

ACCOUNTANT_CONTENT = {
    "title": "Бухгалтер",
    "summary": (
        "Професія бухгалтера у стартапах поєднує глибоку фінансову експертизу та готовність підтримувати "
        "швидке зростання бізнесу в умовах невизначеності."
    ),
    "vacancies": [
        {
            "id": "linkedin",
            "label": "Mate Academy — Accountant",
            "url": "https://ua.linkedin.com/jobs/view/accountant-at-mate-academy-4304055261?trk=public_jobs_topcard-title",
            "image": "images/linkdein.png",
            "alt": "Mate Academy Accountant vacancy on LinkedIn",
        },
        {
            "id": "dou-primary",
            "label": "Solidgate — Accountant",
            "url": "https://jobs.dou.ua/companies/solidgate/vacancies/224985",
            "image": "images/dou.png",
            "alt": "Solidgate Accountant vacancy on DOU",
        },
        {
            "id": "dou-secondary",
            "label": "Tranzzo — Accountant",
            "url": "https://jobs.dou.ua/companies/tranzzo/vacancies/330789",
            "image": "images/dou.png",
            "alt": "Tranzzo Accountant vacancy on DOU",
        },
    ],
    "conclusions": [
        (
            "Усі три вакансії вимагають вищу фінансово-економічну освіту, досвід роботи в бухгалтерії та впевнене "
            "володіння Excel."
        ),
        (
            "Mate Academy — освіта (EdTech), Solidgate — фінансові технології (FinTech), Tranzzo — платіжна "
            "інфраструктура (PaymentTech)."
        ),
        (
            "Для стартапів критичні аналітичність, самостійність, здатність працювати в динамічному середовищі."
        ),
        (
            "Найцінніші навички: цифрова грамотність, адаптивність, комунікаційність і точність."
        ),
    ],
    "comparison": {
        "image": "images/unnamed.png",
        "alt": "Порівняння вакансій бухгалтерів у стартап-компаніях",
        "caption": (
            "Порівняння вимог і обов'язків бухгалтерів у стартапах Mate Academy, Solidgate та Tranzzo."
        ),
    },
}


@app.route("/")
def index():
    return app.send_static_file("index.html")


@app.route("/api/startup-insights")
def startup_insights():
    return jsonify(STARTUP_CONTENT)


@app.route("/api/accountant-vacancies")
def accountant_vacancies():
    return jsonify(ACCOUNTANT_CONTENT)


if __name__ == "__main__":
    app.run(debug=True)
