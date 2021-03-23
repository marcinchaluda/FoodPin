from django.http.response import JsonResponse


def return_dummy_donations_data(request):
    return JsonResponse([
        {
            "donation_id": 1,
            "userName": "Robek",
            "avatar_url": "default_avatar",
            "photo_url": "food-placeholder.jpg",
            "title": "Pyrki z piwnicy",
            "distance": 4.25,
            "date": "04.02.2021",
        }, {
            "donation_id": 2,
            "userName": "Adam",
            "avatar_url": "default_avatar",
            "photo_url": "food-placeholder.jpg",
            "title": "Pomidorki",
            "distance": 12.01,
            "date": "23.12.2021",
        }, {
            "donation_id": 3,
            "userName": "Marcin",
            "avatar_url": "default_avatar",
            "photo_url": "food-placeholder.jpg",
            "title": "Banany",
            "distance": 7.35,
            "date": "01.01.2021",
        }, {
            "donation_id": 4,
            "userName": "Daniel",
            "avatar_url": "default_avatar",
            "photo_url": "food-placeholder.jpg",
            "title": "Marchewka",
            "distance": 0.97,
            "date": "04.05.2023",
        }, {
            "donation_id": 5,
            "userName": "Kasia",
            "avatar_url": "default_avatar",
            "photo_url": "food-placeholder.jpg",
            "title": "Pietruszka",
            "distance": 1.5,
            "date": "06.10.2020",
        }
    ], safe=False)
