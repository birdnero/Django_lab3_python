from django.http import HttpResponse
from .repository.Repository import Repository

# Create your views here.
def get(request, model_name):
    mp = Repository()

    if not hasattr(mp, model_name): return HttpResponse(f"Error: repository '{model_name}' not found")

    repository = getattr(mp, model_name)
    item_id = request.GET.get('id')

    if item_id: return HttpResponse(str(repository.get_by_id(item_id)))
    else: return HttpResponse(repository.get_all())


# Create your views here.
def add(request, model_name):
    mp = Repository()
    
    if not hasattr(mp, model_name): return HttpResponse(f"Error: repository '{model_name}' not found")
    
    repository = getattr(mp, model_name)
    
    try:
        data = {k: v for k, v in request.GET.items()}
        return HttpResponse(repository.create(**data))
        
    except Exception:
        return HttpResponse('bad params')
    


