insertHeap(A, n, value)
{
    n = n + 1;
    A[n] = value;
    i = n;

    while (i > 1)
    {
        parent = floorvalueofi / 2;

        if (A[parent] < A[i])
        {
            swap(A[parent], A[i]);
            i = parent;
        }
        else
        {
            return;
        }
    }
}
