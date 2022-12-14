/*
손으로 해보는 방법으로 해봅니다.
일단 가장 큰 화폐로 최대치까지 만들 수 있는 만큼으로 하고, 하나씩 깍아가면서 이를 분배하는 방법을 샙니다.

Q:25
D:10
N:5
P:1


QDNP(N) = Q, D, N, P를 써서 N을 만드는 경우의 수

QDNP(N) = sum DNP(N) + DNP(N - 25) + DNP(N - 25 * 2) + ... DNP(N - 25 * (25/N))
        = sum DNP(N - i * 25)

DNP(N) = sum NP(N - i * 10)

NP(N) = sum P(N - i * 5)

P(N) = 1

이대로 구현해도 되긴 한다.

----------

좀 더 다르게 표현할 수 있을까?

C(G, q, d, n, p) = q개 Q, d개 D, n개 N, p개 P를 써서 G을 만드는 방법의 수.

C(G, q+1, d, n, p - 25)
C(G, q, d+1, n, p - 10)
C(G, q, d, n + 1, p - 5)


*/
