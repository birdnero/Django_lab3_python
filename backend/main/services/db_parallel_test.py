import time
from concurrent.futures import ThreadPoolExecutor

class DBParallelTester:

    def __init__(self, repository):
        self.repository = repository

    def run(self, theatre_ids, max_threads=8, repeat=20):
        results = []

        for threads in range(1, max_threads + 1):
            start = time.perf_counter()

            with ThreadPoolExecutor(max_workers=threads) as pool:
                list(
                    pool.map(
                        self.repository.count_tickets,
                        theatre_ids * repeat
                    )
                )

            elapsed = time.perf_counter() - start

            results.append({
                "threads": threads,
                "time": elapsed
            })

        return results
